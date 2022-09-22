require 'faker'
require 'csv'

User.destroy_all
Contact.destroy_all
Company.destroy_all

puts 'seeding users...'

user1 = User.create!(name: "Bill", email: "bill@gmail.com", username: "bill", password_digest: "bill")
user2 = User.create!(name: "Alex", email: "alex@gmail.com", username: "alex", password_digest: "alex")
user3 = User.create!(name: "Ben", email: "ben@gmail.com", username: "ben", password_digest: "ben")

puts 'reading contacts csv'

# reads csv file into a variable
contacts_csv_text = File.read(Rails.root.join('lib', 'seeds', 'contacts_consolidated.csv'))
# puts contacts_csv_text

puts 'parsing contacts csv'
# converts csv file into a structure that ruby can read. :headers => true tesll the parser to ignore the first line of the csv file.
contacts_csv = CSV.parse(contacts_csv_text, :headers => true, :encoding => 'ISO-8859-1')
# puts csv

puts 'seeding contacts'

# # looops through the csv and converts each row into a has. headers of the csv file will be used as keys for the hash b/c we added the :headers => true option in previous step.
# contacts_csv.each do |row|
#     # c = Contact.new
#     # c.name = row['name']
#     # c.pbid = row['pbid']
#     # c.company_name = row['company_name']
#     # c.position = row['position']
#     # c.bio = row['bio']
#     # c.phone = row['phone']
#     # c.email = row['email']
#     # c.location = row['location']
#     # c.twitter_url = row['twitter_url']
#     # c.linkedin_profile_url = row['linkedin_profile_url']
#     # c.linkedin_company_url = row['linkedin_company_url']
#     # c.user_id = row['user_id']
#     # c.image_url = row['image_url']
    
#     # c.save

#     Contact.create!(
#         name: row['name'],
#         pbid: row['pbid'],
#         company_name: row['company_name'],
#         position: row['position'],
#         bio: row['bio'],
#         phone: row['phone'],
#         email: row['email'],
#         location: row['location'],
#         twitter_url: row['twitter_url'],
#         linkedin_profile_url: row['linkedin_profile_url'],
#         linkedin_company_url: row['linkedin_company_url'],
#         user_id: User.first.id,
#         image_url: row['image_url'],
        
#     )
    
#     # puts "#{c.name}, #{c.pbid}, #{c.company_name}, #{c.position}, #{c.bio}, #{c.phone}, #{c.email}, #{c.location}, #{c.twitter_url}, #{c.linkedin_profile_url}, #{c.linkedin_company_url}, #{c.user_id}, #{c.image_url} saved"

# end

puts 'reading companies csv'

companies_csv_text = File.read(Rails.root.join('lib', 'seeds', 'companies_first_seed_simple.csv'))

puts 'parsing companies csv'

companies_csv = CSV.parse(companies_csv_text, :headers => true, :encoding => 'ISO-8859-1')

puts 'seeding companies'

companies_csv.each do |row|
    # c = Company.new
    # c.user_id = row['user_id']
    # c.name = row['name']
    # c.linkedin_company_id = row['linkedin_company_id']
    # c.linkedin_regularCompanyUrl = row['linkedin_regularCompanyUrl']
    # c.logoUrl = row['logoUrl']
    # c.description = row['description']
    # c.website = row['website']
    
    # c.save
    Company.create!(
        user_id: User.first.id,
        name: row['name'],
        linkedin_company_id: row['linkedin_company_id'],
        linkedin_regularCompanyUrl: row['linkedin_regularCompanyUrl'],
        logoUrl: row['logoUrl'],
        description: row['description'],
        website: row['website'],
    )
    # puts "#{c.user_id}, #{c.name}, #{c.linkedin_company_id}, #{c.linkedin_regularCompanyUrl}, #{c.logoUrl}, #{c.description}, #{c.website} saved"

end




# looops through the csv and converts each row into a has. headers of the csv file will be used as keys for the hash b/c we added the :headers => true option in previous step.
contacts_csv.each do |row|
    # c = Contact.new
    # c.name = row['name']
    # c.pbid = row['pbid']
    # c.company_name = row['company_name']
    # c.position = row['position']
    # c.bio = row['bio']
    # c.phone = row['phone']
    # c.email = row['email']
    # c.location = row['location']
    # c.twitter_url = row['twitter_url']
    # c.linkedin_profile_url = row['linkedin_profile_url']
    # c.linkedin_company_url = row['linkedin_company_url']
    # c.user_id = row['user_id']
    # c.image_url = row['image_url']
    
    # c.save
    # note to self - if it can't find the company, create a new company
    company = Company.find_by(name: row['company_name']) || Company.create!(name: row['company_name'], user_id: User.first.id)
    # if !company Company.create(name: row['name']) 
    Contact.create!(
        name: row['name'],
        pbid: row['pbid'],
        company_name: row['company_name'],
        position: row['position'],
        bio: row['bio'],
        phone: row['phone'],
        email: row['email'],
        location: row['location'],
        twitter_url: row['twitter_url'],
        linkedin_profile_url: row['linkedin_profile_url'],
        linkedin_company_url: row['linkedin_company_url'],
        user_id: User.first.id,
        image_url: row['image_url'],
        company_id: company.id,
    )
    
    # puts "#{c.name}, #{c.pbid}, #{c.company_name}, #{c.position}, #{c.bio}, #{c.phone}, #{c.email}, #{c.location}, #{c.twitter_url}, #{c.linkedin_profile_url}, #{c.linkedin_company_url}, #{c.user_id}, #{c.image_url} saved"

end






# # This file should contain all the record creation needed to seed the database with its default values.
# # The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
# #
# # Examples:
# #
# #   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
# #   Character.create(name: "Luke", movie: movies.first)






# puts 'making fake contacts...'

# 50.times {
#     Contact.create!(
#         name: Faker::Name.name,
#         pbid: rand(1..50),
#         company_name: Faker::Company.name,
#         position: "CEO",
#         bio: "I'm the CEO of my company!",
#         phone: Faker::PhoneNumber.cell_phone,
#         email: Faker::Internet.email,
#         location: Faker::Address.full_address,
#         twitter_url: "www.twitter.com",
#         linkedin_profile_url: "linkedin.com",
#         linkedin_company_url: "linkedin.com",
#         user_id: User.all.sample.id
#     )
# }
# contact = Contact.create!(name: "James Madison", pbid: "1", company_name: "Flatiron", position: "CEO", bio: "i lead flatiron", phone: "9199199191", email: "james@gmail.com", location: "USA", twitter_url: "www.twitter.com/james_madison", linkedin_company_url: "linkedin.com/flatiron", user_id: 1)




