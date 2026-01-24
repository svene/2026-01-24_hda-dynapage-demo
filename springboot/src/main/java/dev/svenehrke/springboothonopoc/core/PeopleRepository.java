package dev.svenehrke.springboothonopoc.core;

import java.util.List;

public interface PeopleRepository {
    PersonTableModel people();
    PersonTableModel peopleForSearch(String search);
    int total();
    PersonTableRowModel personTableRowModel(int id);
    PersonEditModel personEditModel(int id);
    PersonDetailModel personDetailModel(int id);
    int deleteByIds(List<Integer> ids);
    int updatePerson(int id, PersonEditModel personEditModel);
}
