import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        onClick={() => onSelectCategory(null)}
        className="flex items-center gap-2"
      >
        All Events
        {selectedCategory === null && <Check className="w-4 h-4" />}
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category)}
          className="flex items-center gap-2"
        >
          {category}
          {selectedCategory === category && <Check className="w-4 h-4" />}
        </Button>
      ))}
    </div>
  );
};