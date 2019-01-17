show databases;
create database magnaaccounts;
use magnaaccounts;



create table company_master(
id int primary key auto_increment ,
name varchar(30) ,
address varchar(50) ,
email varchar(30),
contact varchar(30),
gst varchar(14) 
);

create table users(
id integer primary key auto_increment,
name varchar(30),
mobileno varchar(14),
otp int,
username varchar(30),
password varchar(30),
companyid integer,
foreign key (companyid) references company_master(id)
);

create table forms_master(
id integer primary key auto_increment,
name varchar(30),
companyid integer,
foreign key(companyid) references company_master(id)
);

create table access_rights(
id int  primary key auto_increment,
userid int,
formid int ,
edit bit,
cansave bit,
companyid int ,
foreign key(companyid) references company_master(id),
foreign key(userid) references users(id),
foreign key(formid) references forms_master(id)
);

create table category_master(
id int primary key auto_increment,
name varchar(30),
companyid int,
foreign key(companyid) references company_master(id)
);

create table unit_master(
id int primary key auto_increment,
name varchar(30),
companyid int,
foreign key(companyid) references company_master(id)
);

create table item_master(
id int primary key auto_increment,
name varchar(30),
categoryid int ,
itemcode varchar(30),
hsncode varchar(30),
sellingprice decimal(18,2),
cgst decimal,
sgst decimal,
description varchar(100),
unitid int,
discount_applicable decimal,
companyid int,
foreign key(companyid) references company_master(id),
foreign key(categoryid) references category_master(id),
foreign key(unitid) references unit_master(id)
);

create table stock(
id int primary key auto_increment,
itemid int,
quantity decimal,
companyid int,
foreign key(companyid) references company_master(id),
foreign key(itemid) references item_master(id)
);

create table vendor_master(
id int primary key auto_increment,
name varchar(250),
contactnumber varchar(50),
Email varchar(150) NULL,
GSTNumber varchar(50) NULL,
Province varchar(250) NULL,
StateCode varchar(50) NULL,
CompanyID int NULL,
foreign key(companyid) references company_master(id)
);

create table purchase_master(
id int primary key auto_increment,
vendorid int,
billnumber varchar(15),
billdate date,
totalamount decimal,
companyid int,
foreign key(companyid) references company_master(id),
foreign key(vendorid) references vendor_master(id)
);


create table purchase_details(
id int primary key auto_increment,
purchaseid int,
itemid int,
quantity decimal,
price decimal,
cgst decimal,
sgst decimal,
discount decimal,
total decimal,
companyid int,
foreign key(companyid) references company_master(id),
foreign key(purchaseid) references purchase_master(id),
foreign key(itemid) references item_master(id)
);

create table payment_type(
id int primary key auto_increment,
name varchar(30),
companyid int,
foreign key(companyid) references company_master(id)
);

CREATE TABLE Party_Master(
id int primary key auto_increment,
Name varchar(250) NULL,
ContactNumber varchar(50) NULL,
Email varchar(150) NULL,
GSTNumber varchar(50) NULL,
Address varchar(250) NULL,
DiscountPercent decimal(18, 2) NULL,
CompanyID int NULL,
foreign key(companyid) references company_master(id)
);

create table payment_recieved(
id int primary key auto_increment,
billid int,
partyid int,
customername varchar(30),
amountrecieved decimal,
paymentmodelID int,
dateofamountrecieved date,
companyid int,
foreign key(companyid) references company_master(id),
foreign key(partyid) references party_master(id),
foreign key(billid) references bill_master(id)
);


