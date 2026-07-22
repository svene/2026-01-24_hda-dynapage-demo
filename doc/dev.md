# Information for Development

## Setup and run

To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## TODO

- rename: people -> person
- patterns: events: 1: no HTML needed (only new event), 2: HTML needed


## Notes

### 10.01.2026

**Context**  
A table with first column of checkboxes for selection
(e.g. for mass deletion)
means the whole table needs to be in a form.

If a row can be put into an edit mode to modify an existing
row this needs to be in a form as well.

**Problem**  
Now we have two nested forms which should be avoided.

**Recommended Solution**  
Put a form with just the delete button inside outside of the table
and set the 'form' attribute on the checkboxes pointing to it:

````html
<form id="bulkDeleteForm" hx-delete="/person/delete">
  <button type="submit" class="button">Delete</button>
</form>
<table>
    <tr>
        <td>
            <input
                type="checkbox"
                name="selection"
                value={props.vm.id}
                form="bulkDeleteForm" // Bind checkbox to outer form 
            >
        </td>
    </tr>
</table>

````

Now the edit-form is not nested anymore and everything works.

**Alternative Solution**  
introduce a "selection mode" so that
the column with the checkboxes only appears when this
mode is chosen and the mass deletion can be performed.
In this mode editing of rows is prohibited.
When mass deletion is done by the user the table
can be switched back to normal mode.

### 06.02.2026

**Context**

Idea for event approach:  
instead of sending an 'action request to the server' to only produce an event with the HTTP response (and no html coming back)
send the event directly on the client.  
Example with htmx on the sending side and alpineJS on the receiving side:
````html
// evt-person-details-row.tsx:
export const EvtPersonDetailsRow = (props: { vm: EvtPersonDetailModel }) => (
<>
<tr
  id={`row-${props.vm.id}`}
  hx-on:click={`htmx.trigger(window, 'cdr', {id: '${props.vm.id}'})`}
...

// evt-person-page.tsx:
// JSX-workaround for special chars:
<div
{...{
  'x-on:cdr.window': `console.log('cdr from window received:', event.detail.id)`
}}
>Alpine Receiver</div>
````

Another idea to avoid sending events via HTTP-response (to be verified):  
Use reactive alpineJS: sender sets a alpine-store property and receiver reacts to it.

### 07.02.2026

Some notes when working with events

````html
<tr id={`row-${props.vm.id}-edit`}>
  <template
    _={`on 'eventName('PersonDetailsRow_CloseCmd')'(id) from <body/> if id == ${props.vm.id} console.log(id) end`}
	></template>
<button
		class="level-item button"
		_={`on click halt the event then send 'eventName('PersonDetailsRow_CloseCmd')'(id:${props.vm.id}) to <body/>`}
>&lt; Back
</button>

````
