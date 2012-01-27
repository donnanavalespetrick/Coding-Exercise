
    if exists (select * from dbo.sysobjects where id = object_id(N'BlogPosts') and OBJECTPROPERTY(id, N'IsUserTable') = 1) drop table BlogPosts

    if exists (select * from dbo.sysobjects where id = object_id(N'hibernate_unique_key') and OBJECTPROPERTY(id, N'IsUserTable') = 1) drop table hibernate_unique_key

    create table BlogPosts (
        Id INT not null,
       Content NVARCHAR(255) null,
       DateCreated DATETIME null,
       primary key (Id)
    )

    create table hibernate_unique_key (
         next_hi INT 
    )

    insert into hibernate_unique_key values ( 1 )
