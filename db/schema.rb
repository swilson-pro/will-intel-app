# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_05_202733) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.string "linkedin_company_id"
    t.string "linkedin_regularCompanyUrl"
    t.string "logoUrl"
    t.text "description"
    t.string "website"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "pb_companyID"
    t.string "company_also_known_as"
    t.string "parent_company"
    t.string "company_legal_name"
    t.string "primary_industry_sector"
    t.string "primary_industry_group"
    t.string "primary_industry_code"
    t.string "verticals"
    t.string "employees"
    t.string "year_founded"
    t.string "primary_contact_pbid"
    t.string "primary_contact"
    t.string "hq_location"
    t.string "hq_address_line_1"
    t.string "hq_address_line_2"
    t.string "hq_city"
    t.string "hq_state_or_province"
    t.string "hq_post_code"
    t.string "hq_country_or_terrirory"
    t.string "hq_phone"
    t.string "hq_email"
    t.string "hq_global_region"
    t.string "hq_global_sub_region"
    t.text "financing_status_note"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "name"
    t.string "pbid"
    t.string "company_name"
    t.string "position"
    t.string "bio"
    t.string "phone"
    t.string "email"
    t.string "location"
    t.string "twitter_url"
    t.string "linkedin_profile_url"
    t.string "linkedin_company_url"
    t.integer "user_id"
    t.integer "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url"
    t.string "input_owner_name"
    t.boolean "is_dupe_primary"
  end

  create_table "notes", force: :cascade do |t|
    t.integer "user_id"
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "notable_id"
    t.string "notable_type"
    t.index ["notable_id", "notable_type"], name: "index_notes_on_notable_id_and_notable_type"
  end

  create_table "products", force: :cascade do |t|
    t.string "brand"
    t.string "name"
    t.decimal "price"
    t.string "price_sign"
    t.string "currency"
    t.string "image_link"
    t.string "product_link"
    t.string "website"
    t.text "description"
    t.string "rating"
    t.string "category"
    t.string "product_type"
    t.string "api_featured_image"
    t.integer "company_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "input_company_name"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "country"
    t.string "image"
    t.string "first_name"
    t.string "last_name"
    t.string "role"
  end

end
