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
        pb_companyID: row['pb_companyID'],
        company_also_known_as: row['company_also_known_as'],
        parent_company: row['parent_company'],
        company_legal_name: row['company_legal_name'],
        primary_industry_sector: row['primary_industry_sector'],
        primary_industry_group: row['primary_industry_group'],
        primary_industry_code: row['primary_industry_code'],
        verticals: row['verticals'],
        employees: row['employees'],
        year_founded: row['year_founded'],
        primary_contact_pbid: row['primary_contact_pbid'],
        primary_contact: row['primary_contact'],
        hq_location: row['hq_location'],
        hq_address_line_1: row['hq_address_line_1'],
        hq_address_line_2: row['hq_address_line_2'],
        hq_city: row['hq_city'],
        hq_state_or_province: row['hq_state_or_province'],
        hq_post_code: row['hq_post_code'],
        hq_country_or_terrirory: row['hq_country_or_terrirory'],
        hq_phone: row['hq_phone'],
        hq_email: row['hq_email'],
        hq_global_region: row['hq_global_region'],
        hq_global_sub_region: row['hq_global_sub_region'],
        financing_status_note: row['financing_status_note'],

        

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


puts 'reading products csv'

products_csv_text = File.read(Rails.root.join('lib', 'seeds', 'makeup_api_seed.csv'))

puts 'parsing products csv'

products_csv = CSV.parse(products_csv_text, :headers => true, :encoding => 'ISO-8859-1')

puts 'seeding products'

products_csv.each do |row|

    company = Company.find_by(website: row['website']) || Company.create!(name: row['brand'], user_id: User.first.id)

    product = Product.create!(
        brand: row['brand'],
        name: row['name'],
        price: row['price'],
        price_sign: row['price_sign'],
        currency: row['currency'],
        image_link: row['image_link'],
        product_link: row['product_link'],
        website: row['website'],
        description: row['description'],
        rating: row['rating'],
        category: row['category'],
        product_type: row['product_type'],
        api_featured_image: row['api_featured_image'],
        company_id: company.id,
    )
end

puts "making notes"

300.times{
    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "Very good opportunity here!")

    Note.create(
        notable: Company.all.sample,
        user: User.all.sample,
        content: "This company has a lot of potential, I think they'd be interested in working with us."
    )
    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "Seems like they're intersted!")

    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "This could be a great opportunity.")

    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "Think they're a good fit")

    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "Impressive experience")

    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "Outstanding background.")

    Note.create(
        notable: Contact.all.sample, 
        user: User.all.sample, 
        content: "I think this could work")
        
    Note.create(
        notable: Company.all.sample, 
        user: User.all.sample, 
        content: "This organization seems to be in need of our services.")

    Note.create(
        notable: Company.all.sample, 
        user: User.all.sample, 
        content: "Great organization with great people. I think we're going to be able to help them a lot.")        

    Note.create(
        notable: Product.all.sample, 
        user: User.all.sample, 
        content: "This is an amazing product.")

    Note.create(
        notable: Product.all.sample, 
        user: User.all.sample, 
        content: "This product is selling like hot pockets!")

        

}



# 300.times{
#     Note.create!(
#         content: "Seems like they're intersted!",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )

#     Note.create!(
#         content: "This could be a great opportunity.",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )

#     Note.create!(
#         content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )

#     Note.create!(
#         content: "Think they're a good fit.",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )
#     Note.create!(
#         content: "Impressive experience.",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )
#     Note.create!(
#         content: "Outstanding background.",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )

#     Note.create!(
#         content: "I think this could work.",
#         contact_id: Contact.all.sample.id,
#         user_id: User.all.sample.id
#     )

#     }
