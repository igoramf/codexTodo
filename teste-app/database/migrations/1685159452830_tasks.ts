import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Todos extends BaseSchema {
	protected tableName = "tasks";
    
	public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id");
            table.string("title", 60).notNullable();
            table.string("desc", 255).notNullable();
            table.boolean("status").defaultTo(false);
			table.integer("user_id").notNullable();
            table.timestamps(true);
		});
	}
    
	public async down() {
		this.schema.dropTable(this.tableName);
	}
}