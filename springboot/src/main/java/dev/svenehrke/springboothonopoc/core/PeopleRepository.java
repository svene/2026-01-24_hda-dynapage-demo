package dev.svenehrke.springboothonopoc.core;

import java.util.List;

public interface PeopleRepository {
    OOBPersonTableModel people();
    OOBPersonTableModel peopleForSearch(String search);
    int total();
    OOBPersonTableRowModel personTableRowModel(int id);
    OOBPersonEditModel personEditModel(int id);
    OOBPersonDetailModel personDetailModel(int id);
    int deleteByIds(List<Integer> ids);
    int updatePerson(int id, OOBPersonEditModel personEditModel);
}
