create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price real not null
);

create extension if not exists "uuid-ossp";

create table stocks (
	product_id uuid not null primary key,
	product_count integer not null,
	foreign key (product_id) references products(id) on delete cascade
);

/* insert values to products table */
insert into products(title, description, price) values ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday', 109.95);
insert into products(title, description, price) values ('Mens Casual Slim Fit', 'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.', 15.99);

/* insert values to stocks table */
insert into stocks(product_id, product_count) values ('e14ff050-04dc-460a-a981-08c8941dcba4', 120);
insert into stocks(product_id, product_count) values ('51a15ac5-da96-42b4-a918-1749f6b1a95c', 430);

/* insert to both products and stocks using transaction */
begin transaction;
	do $$
	declare 
		added_product_id products.id%type;
	begin
		insert into products(title, description, price) values ('dummy title', 'dummy_description', 69) returning id into added_product_id;
		insert into stocks(product_id, product_count) values (added_product_id, 40);
	end $$;
commit;



