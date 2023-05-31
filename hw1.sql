create database hw1;
use hw1;

create table users(
	id integer primary key auto_increment,
    nome varchar(255) not null,
    cognome varchar(255) not null,
    email varchar(255) not null,
    username varchar(255) not null unique,
    password varchar(255) not null,
    profile_pic varchar(255),
    copertina varchar(255)
);

create table liked_movies(
	movie_id integer,
	user_id integer,
    title varchar(255),
    poster varchar(255),
    overview text,
    popularity float,
    releaseDate date,
    
    primary key (movie_id, user_id),
    foreign key(user_id) references users(id)
);

create table watch_list(
	movie_id integer,
	user_id integer,
    title varchar(255),
    poster varchar(255),
    overview text,
    popularity float,
    releaseDate date,
    
    primary key (movie_id, user_id),
    foreign key(user_id) references users(id)
);

create table amicizia(
	user_id integer,
    amico integer,
    
    primary key(user_id, amico),
	foreign key(user_id) references users(id),
    foreign key(amico) references users(id)
);


create table richiesta(
	id integer primary key auto_increment,
	sender integer,
    receiver integer,
    stato integer check(0<=stato<=2),
    
    foreign key(sender) references users(id),
    foreign key(receiver) references users(id)
);