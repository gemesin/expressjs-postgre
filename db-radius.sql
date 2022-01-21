CREATE TABLE "user" (
  "user_id" SERIAL PRIMARY KEY,
  "user_name" varchar,
  "user_email" varchar,
  "user_password" varchar,
  "user_phone_number" char,
  "user_first_name" varchar,
  "user_last_name" varchar,
  "user_referal_code" varchar,
  "user_profile_url" varchar,
  "user_role" varchar,
  "user_radius_point" varchar,
  "user_join_date" date,
  "user_status" varchar,
  "user_created_at" timestamp,
  "user_updated_at" timestamp
);

CREATE TABLE "user_address" (
  "address_id" int PRIMARY KEY,
  "address_user_id" int,
  "address_title" varchar,
  "address_primary" text,
  "address_order" text,
  "address_line1" varchar,
  "address_line2" varchar,
  "address_province_id" int,
  "address_province" varchar,
  "address_city_id" int,
  "address_city" varchar,
  "address_district_id" int,
  "address_district" varchar,
  "address_postal_code" int,
  "address_longitude" varchar,
  "address_latitude" varchar,
  "address_status" varchar,
  "address_created_at" timestamp,
  "address_updated_at" timestamp
);

CREATE TABLE "master_product" (
  "product_id" int PRIMARY KEY,
  "product_sku" char,
  "product_name" varchar,
  "product_desc" text,
  "product_photo" varchar,
  "product_category_id" int,
  "product_conditional_id" int,
  "product_price_hpp" char,
  "product_sell_price" char,
  "product_discount_amount" char,
  "product_stock" int,
  "product_type" varchar,
  "product_status" varchar,
  "product_created_at" timestamp,
  "product_updated_at" timestamp
);

CREATE TABLE "branch" (
  "branch_id" int PRIMARY KEY,
  "branch_name" varchar,
  "branch_address" text,
  "branch_address_optional" text,
  "branch_province_id" int,
  "branch_province" varchar,
  "branch_district_id" int,
  "branch_district" varchar,
  "branch_sub_district_id" int,
  "branch_sub_district" varchar,
  "branch_postal_code" int,
  "branch__longitude" varchar,
  "branch_latitude" varchar,
  "branch_phone_number" char,
  "branch_mobile_number" char,
  "branch_open" varchar,
  "branch_close" varchar,
  "branch_admin_id" int,
  "branch_supervisor_id" int,
  "branch_status" varchar,
  "branch_created_at" timestamp
);

CREATE TABLE "branch_product" (
  "branch_product_id" int PRIMARY KEY,
  "branch_product_branch_id" int,
  "branch_product_product_id" int,
  "branch_product_qty" int,
  "branch_product_sell_price" int,
  "branch_product_created_at" timestamp,
  "branch_product_updated_at" timestamp
);

CREATE TABLE "product_category" (
  "category_id" int PRIMARY KEY,
  "category_name" varchar,
  "category_desc" text,
  "category_image" varchar,
  "category_status" varchar,
  "category_created_at" timestamp,
  "category_updated_at" timestamp
);

CREATE TABLE "product_sub_category" (
  "sub_category_id" int PRIMARY KEY,
  "sub_category_category_id" int,
  "sub_category_name" varchar,
  "sub_category_desc" text,
  "sub_category_image" varchar,
  "sub_category_created_at" timestamp,
  "sub_category_updated_at" timestamp
);

CREATE TABLE "wishlist" (
  "wishlist_id" int PRIMARY KEY,
  "wishlist_branch_product_id" int,
  "wishlist_user_id" int
);

CREATE TABLE "transaction" (
  "transaction_id" int PRIMARY KEY,
  "transaction_product_sku" int,
  "transaction_code" char,
  "transaction_user_id" int,
  "transaction_user_name" varchar,
  "transaction_user_address_order" text,
  "transaction_user_phone_number" char,
  "transaction_sales_id" int,
  "transaction_sales_name" varchar,
  "transaction_total_qty" int,
  "transaction_total_price" int,
  "transaction_total_discount" int,
  "transaction_payment_id" int,
  "transaction_status" varchar,
  "transaction_created_at" timestamp,
  "transaction_updated_at" timestamp
);

CREATE TABLE "transaction_detail" (
  "detail_id" int PRIMARY KEY,
  "detail_transaction_id" int,
  "detail_branch_product_id" int,
  "detail_product_sku" int,
  "detail_product_name" varchar,
  "detail_product_image" varchar,
  "detail_branch_product_sell_price" int,
  "detail_qty" int,
  "detail_total_discount_amount" int,
  "detail_total_price" int,
  "detail_created_at" timestamp,
  "detail_updated_at" timestamp
);

CREATE TABLE "transaction_payment" (
  "payment_id" int PRIMARY KEY,
  "payment_transaction_id" int,
  "payment_method" varchar,
  "payment_amount" int,
  "payment_status" varchar,
  "payment_datetime" timestamp
);

CREATE TABLE "cart" (
  "cart_id" int PRIMARY KEY,
  "cart_branch_product_id" int,
  "cart_product_name" int,
  "cart_prduct_image" int,
  "cart_qty" int,
  "cart_total_amount" int
);

ALTER TABLE "user_address" ADD FOREIGN KEY ("address_user_id") REFERENCES "user" ("user_id");

ALTER TABLE "branch_product" ADD FOREIGN KEY ("branch_product_branch_id") REFERENCES "branch" ("branch_id");

ALTER TABLE "branch_product" ADD FOREIGN KEY ("branch_product_product_id") REFERENCES "master_product" ("product_id");

ALTER TABLE "master_product" ADD FOREIGN KEY ("product_category_id") REFERENCES "product_category" ("category_id");

ALTER TABLE "product_sub_category" ADD FOREIGN KEY ("sub_category_category_id") REFERENCES "product_category" ("category_id");

ALTER TABLE "wishlist" ADD FOREIGN KEY ("wishlist_branch_product_id") REFERENCES "branch_product" ("branch_product_id");

ALTER TABLE "wishlist" ADD FOREIGN KEY ("wishlist_user_id") REFERENCES "user" ("user_id");

ALTER TABLE "transaction" ADD FOREIGN KEY ("transaction_payment_id") REFERENCES "transaction_payment" ("payment_id");

ALTER TABLE "transaction_detail" ADD FOREIGN KEY ("detail_transaction_id") REFERENCES "transaction" ("transaction_id");

ALTER TABLE "transaction_detail" ADD FOREIGN KEY ("detail_branch_product_id") REFERENCES "branch_product" ("branch_product_id");

ALTER TABLE "cart" ADD FOREIGN KEY ("cart_branch_product_id") REFERENCES "branch_product" ("branch_product_id");
