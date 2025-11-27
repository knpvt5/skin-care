# supabase update

connect the supabase with thsi project and replace all of this contact, blogs and products data with data in table

1. i have added the supabase key and url
2.  i have created the contact table `the table name is contact` with the columns name, email, subject and message
3. also i have created the products table `the table name is products` with the columns: -

  brand text not null,
  name text not null,
  description text,
  <!-- -- Tags -->
  tags text[],

  image_url text not null,


  price numeric(10,2) not null,

<!-- for affiliate link -->
  product_url text,

4. i have also create the blog table `the table name is blogs` with the columns: -

 <!-- -- Blog fields -->
  title text not null,
  content text not null,
  category text not null,
  image_url text not null,
  read_time integer not null,

  <!-- -- Tags (multiple values) -->
  tags text[],

<!--for date -->
  published_at timestamptz not null default now(),