package dev.svenehrke.springboothonopoc.outbound.db;

import dev.svenehrke.springboothonopoc.core.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.JdbcClient;

import java.util.List;

public class HSQLPeopleRepository implements PeopleRepository {

	private final JdbcClient jdbcClient;
	private final JdbcTemplate jdbcTemplate;
	private final RouteBuilder routeBuilder;

	public HSQLPeopleRepository(
		JdbcClient jdbcClient,
		JdbcTemplate jdbcTemplate,
		RouteBuilder routeBuilder
	) {
		this.jdbcClient = jdbcClient;
		this.jdbcTemplate = jdbcTemplate;
		this.routeBuilder = routeBuilder;
	}

	@Override
	public OOBPersonTableModel people() {
		var sql = "select id, firstname, lastname, streetname from Person limit 20";
		List<OOBPersonTableRowModel> result = jdbcClient.sql(sql).query(
			(rs, rowNum) -> new OOBPersonTableRowModel(
				rs.getInt("id"),
				rs.getString("firstname"),
				rs.getString("lastname"),
				rs.getString("streetname"),
				routeBuilder.detailsUrl(rs.getInt("id"))
		)).list();
		return new OOBPersonTableModel(result, total());
	}

	@Override
	public OOBPersonTableModel peopleForSearch(String search) {
		var sql = """
			select id, firstname, lastname, streetname
			from Person
			where
				firstname like (:search)
				or lastname like (:search)
				or streetname like (:search)
			limit 20
			""";
		List<OOBPersonTableRowModel> result = jdbcClient.sql(sql)
			.param("search", "%" + search + "%")
			.query(
			(rs, rowNum) -> new OOBPersonTableRowModel(
				rs.getInt("id"),
				rs.getString("firstname"),
				rs.getString("lastname"),
				rs.getString("streetname"),
				routeBuilder.detailsUrl(rs.getInt("id"))
			)).list();
		return new OOBPersonTableModel(result, total());
	}

	@Override
	public int total() {
		Integer count = jdbcTemplate.queryForObject(
			"SELECT COUNT(*) FROM Person",
			Integer.class
		);
		return count == null ? 0 : count;
	}

	@Override
	public OOBPersonTableRowModel personTableRowModel(int id) {
		var sql = "select id, firstname, lastname, streetname from Person where id = ?";
		OOBPersonTableRowModel result = jdbcClient.sql(sql)
			.param(id)
			.query(
			(rs, rowNum) -> new OOBPersonTableRowModel(
				rs.getInt("id"),
				rs.getString("firstname"),
				rs.getString("lastname"),
				rs.getString("streetname"),
				routeBuilder.detailsUrl(rs.getInt("id"))
			)).single();
		return result;
	}

	@Override
	public OOBPersonEditModel personEditModel(int id) {
		var sql = "select id, firstname, lastname, streetname from Person where id = ?";
		return jdbcClient.sql(sql)
			.param(id)
			.query(
				(rs, rowNum) -> new OOBPersonEditModel(
					rs.getInt("id"),
					rs.getString("firstname"),
					rs.getString("lastname"),
					rs.getString("streetname"),
					routeBuilder.detailsCardUrl(rs.getInt("id")),
					routeBuilder.updateUrl(rs.getInt("id"))
				)).single();
	}

	@Override
	public OOBPersonDetailModel personDetailModel(int id) {
		var sql = """
			select
				id, firstname, lastname, streetname, streetno, zipcode, city,
			    country, mailbox, phonenumber, cellphone
			from Person
			where id = ?
			""";
		OOBPersonDetailModel result = jdbcClient.sql(sql)
			.param(id)
			.query(
			(rs, rowNum) -> new OOBPersonDetailModel(
				rs.getInt("id"),
				rs.getString("firstname"),
				rs.getString("lastname"),
				rs.getString("streetname"),
				rs.getString("streetno"),
				rs.getString("zipcode"),
				rs.getString("city"),
				rs.getString("country"),
				rs.getString("mailbox"),
				rs.getString("phonenumber"),
				rs.getString("cellphone"),
				routeBuilder.detailsBackUrl(rs.getInt("id")),
				routeBuilder.editUrl(rs.getInt("id")),
				routeBuilder.rowUrl(rs.getInt("id"))
			)
		).single();
		return result;
	}

	@Override
	public int deleteByIds(List<Integer> ids) {
		var sql = "delete from Person where id in (:ids)";
		return jdbcClient.sql(sql).param("ids", ids).update();
	}

	@Override
	public int updatePerson(int id, OOBPersonEditModel personEditModel) {
		var sql = "update Person set firstname = (:firstname), lastname = (:lastname), streetname = (:streetname) where id = (:id)";
		return jdbcClient.sql(sql)
			.param("firstname", personEditModel.firstName())
			.param("lastname", personEditModel.lastName())
			.param("streetname", personEditModel.streetName())
			.param("id", id)
			.update();
	}

}
