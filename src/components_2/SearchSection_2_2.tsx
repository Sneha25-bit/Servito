import { useState } from "react";
import { Button } from "@/components_2/ui/button_2_2";
import { Input } from "@/components_2/ui/input_2_2";
import { Search, SlidersHorizontal, Calendar, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components_2/ui/select_2_2";
import { Card, CardContent } from "@/components_2/ui/card_2_2";
import { Popover, PopoverContent, PopoverTrigger } from "@/components_2/ui/popover_2_2";
import { Calendar as CalendarComponent } from "@/components_2/ui/calendar_2_2";
import { format } from "date-fns";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState<Date>();
  const [showFilters, setShowFilters] = useState(false);

  const services = [
    "Plumber",
    "Electrician",
    "Carpenter",
    "Cleaner",
    "Painter",
    "AC Repair",
    "Appliance Repair",
    "Pest Control",
  ];

  const budgetRanges = [
    "Under $50",
    "$50 - $100",
    "$100 - $200",
    "$200 - $500",
    "$500+",
  ];

  const timeSlots = [
    "Morning (8AM - 12PM)",
    "Afternoon (12PM - 5PM)",
    "Evening (5PM - 9PM)",
  ];

  return (
    <section id="search-section" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Service
            </h2>
            <p className="text-muted-foreground text-lg">
              Search and filter to find exactly what you need
            </p>
          </div>

          <Card className="shadow-medium animate-scale-in">
            <CardContent className="p-6">
              {/* Main Search Bar */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search for services (e.g., plumber, electrician...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border animate-fade-in">
                  {/* Service Type */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Service Type
                    </label>
                    <Select value={selectedService} onValueChange={setSelectedService}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service.toLowerCase()}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      <DollarSign className="inline h-4 w-4 mr-1" />
                      Budget
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((range) => (
                          <SelectItem key={range} value={range.toLowerCase()}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Time Slot
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot.toLowerCase()}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Search Button */}
              <Button className="w-full mt-6 h-12" size="lg">
                <Search className="mr-2 h-5 w-5" />
                Search Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
