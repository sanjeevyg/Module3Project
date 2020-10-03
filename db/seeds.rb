# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Profile.destroy_all
User.destroy_all

user1 = User.create(name: "Sanjeev", username: "sanjeevyg", email: "yogi.sjv@gmail.com", password: "Laxmi123")
profile1 = Profile.create(name:"Sanjeev's Profile", user: user1)