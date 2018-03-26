var mongoose = require ("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Angelus Hut", 
        image: "http://www.doc.govt.nz/thumbs/large/pagefiles/47576/angelus-hut-campsite-220.jpg",
        description: "This is a walk-in backcountry campsite in an alpine environment near Angeles Hut and Rotomaninitua/Lake Angelus. There is no drive on access. Bookings are essential from late November to 30 April, on Labour weekend and Queen's Birthday weekend."
    },
    {
        name: "Brown Campsite", 
        image: "http://www.doc.govt.nz/thumbs/large/pagefiles/71893/brown-campsite-220.jpg",
        description: "This is a walk-in campsite on the Heaphy Track. It's a good place to stay if you're wanting an early start on the track the next day. It's also close to the Aorere River which offers trout fishing and gold panning."
    },
    {
        name: "Canaan Downs", 
        image: "http://www.doc.govt.nz/thumbs/large/pagefiles/29226/canaan-downs-sun-hero.jpg",
        description: "Located near the entrances to a number of tracks in Abel Tasman National Park; mountain biking, walking, tramping and caving activities are all nearby."
    }
]

//Remove all campgrounds
function seedDB(){
    Campground.remove({}, function(err){
        if(err){
        console.log(err); 
    } 
    console.log("remove campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a campground");
                //add a few comments
                Comment.create(
                    {
                     text: "This site is wonderful! Great for unwinding!",
                     author: "Emma Lin"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save(); 
                            console.log("Created new comment");
                        }
                        });
                }
            });
        });
    }); 
}




module.exports = seedDB;
