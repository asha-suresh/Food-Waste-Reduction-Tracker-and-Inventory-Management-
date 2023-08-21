INSERT INTO public.users (id,email,"password",user_name,created_date,inventory_id) VALUES
	 (1,'chikku','chikku','chikku','2023-08-20',1),
	 (2,'chikkuasha915@gmail.com','asha','asha','2023-08-21',2);

INSERT INTO public.inventory (id) VALUES
	 (1),
	 (2);

INSERT INTO public.inventory_collections (inventory_id,collection_id) VALUES
	 (1,1),
	 (1,3),
	 (1,4),
	 (1,5),
	 (2,6),
	 (2,7),
	 (2,8);

INSERT INTO public.food_items (id,food_name,category,quantity,consumed_quantity,created_date,updated_date,expiry_date,warning_date,status,is_warning_notified,is_expiry_notified,user_id) VALUES
	 (4,'Papaya','Fruit',12,0,'2023-08-20','2023-08-20','2023-08-23','2023-08-22','safe',false,false,1),
	 (5,'jackfruit','Canned Food',127,0,'2023-08-20','2023-08-20','2023-08-22','2023-08-21','safe',false,false,1),
	 (6,'Lemon','Fruit',127,0,'2023-08-20','2023-08-20','2023-08-20','2023-08-20','expired',false,true,1),
	 (1,'Carrot','Vegetable',14,0,'2023-08-20','2023-08-20','2023-08-15','2023-08-16','expired',false,true,1),
	 (3,'apple','Juice',127,0,'2023-08-20','2023-08-20','2023-08-09','2023-08-12','expired',false,true,1),
	 (2,'Beetroot Juice','Juice',127,0,'2023-08-20','2023-08-20','2023-08-09','2023-08-12','expired',false,true,1),
	 (7,'apple','Fruit',66,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (8,'apple','Fruit',56,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (9,'apple','Canned Food',56,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (10,'apple','Canned Food',8,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1);
INSERT INTO public.food_items (id,food_name,category,quantity,consumed_quantity,created_date,updated_date,expiry_date,warning_date,status,is_warning_notified,is_expiry_notified,user_id) VALUES
	 (11,'Beetroot Juice','Juice',9,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (12,'apple','Fruit',1,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (13,'apple','Canned Food',8,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (14,'Guava','Fruit',7,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (15,'Lychee','Juice',12,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (16,'apple','Canned Food',9,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (17,'Peanuts','Canned Food',9,0,'2023-08-21','2023-08-21','2023-08-27','2023-08-25','safe',false,false,1),
	 (18,'Peanuts','Fruit',1,0,'2023-08-21','2023-08-21','2023-08-10','2023-08-13','safe',false,false,1),
	 (19,'Raisins','Snack',78,0,'2023-08-21','2023-08-21','2023-08-10','2023-08-13','safe',false,false,1),
	 (20,'Walnuts','Snack',78,0,'2023-08-21','2023-08-21','2023-08-10','2023-08-13','safe',false,false,1);
INSERT INTO public.food_items (id,food_name,category,quantity,consumed_quantity,created_date,updated_date,expiry_date,warning_date,status,is_warning_notified,is_expiry_notified,user_id) VALUES
	 (21,'Pretzels','Canned Food',78,0,'2023-08-21','2023-08-21','2023-08-10','2023-08-13','safe',false,false,1),
	 (22,'Tomato','vegetable',24,0,'2023-08-21','2023-08-21','2023-08-25','2023-08-24','safe',false,false,2),
	 (23,'Lime','Canned Food',1,0,'2023-08-21','2023-08-21','2023-08-22','2023-08-21','safe',false,false,2),
	 (24,'Popcorn','Canned Food',6,0,'2023-08-21','2023-08-21','2023-08-18','2023-08-19','safe',false,false,2);

INSERT INTO public.collections (id,collection_name,created_date,updated_date) VALUES
	 (1,'Friday','2023-08-20','2023-08-20'),
	 (2,'Fruit','2023-08-20','2023-08-20'),
	 (3,'Vegetable','2023-08-20','2023-08-20'),
	 (4,'Walldrop','2023-08-21','2023-08-21'),
	 (5,'Grocery','2023-08-21','2023-08-21'),
	 (6,'Basket','2023-08-21','2023-08-21'),
	 (7,'StoreRoom','2023-08-21','2023-08-21'),
	 (8,'fridge','2023-08-21','2023-08-21');

INSERT INTO public.collection_food_items (collection_id,food_item_id) VALUES
	 (1,1),
	 (1,2),
	 (1,3),
	 (1,4),
	 (1,5),
	 (1,6),
	 (1,7),
	 (1,8),
	 (1,9),
	 (1,10);
INSERT INTO public.collection_food_items (collection_id,food_item_id) VALUES
	 (1,11),
	 (1,12),
	 (3,13),
	 (4,14),
	 (4,15),
	 (1,16),
	 (1,17),
	 (5,18),
	 (1,19),
	 (1,20);
INSERT INTO public.collection_food_items (collection_id,food_item_id) VALUES
	 (1,21),
	 (7,22),
	 (6,23),
	 (8,24);