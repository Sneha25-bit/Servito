import { Card, CardContent } from "@/components_2/ui/card_2_2";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components_2/ui/avatar_2_2";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Homeowner",
      avatar: "SJ",
      rating: 5,
      review: "Found an amazing electrician through Servito! The booking process was super easy and the professional arrived on time. Highly recommend!",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      avatar: "MC",
      rating: 5,
      review: "Best service platform I've used. The reviews helped me choose the right plumber, and the pricing was transparent from the start.",
    },
    {
      name: "Emily Rodriguez",
      role: "Apartment Resident",
      avatar: "ER",
      rating: 5,
      review: "Quick, reliable, and professional. Booked a cleaner within minutes and the service was exceptional. Will definitely use again!",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real reviews from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-foreground mb-6 italic">
                  "{testimonial.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
