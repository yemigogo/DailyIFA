#!/usr/bin/env python3
"""
Odu Ifá Visualization Generator
Creates visual representations of the 16 major Odu using turtle graphics
Based on traditional Ifá symbols and patterns
"""

import turtle
import os
from typing import List, Tuple

class OduVisualizer:
    def __init__(self):
        self.screen = turtle.Screen()
        self.screen.bgcolor("white")
        self.turtle = turtle.Turtle()
        self.turtle.speed(3)
        self.turtle.pensize(5)
        self.line_height = 100
        self.line_spacing = 30
        
    def clear_screen(self):
        """Clear the screen for new drawing"""
        self.turtle.clear()
        
    def draw_line_pair(self, x: int, y: int, broken: bool = False):
        """Draw a pair of vertical lines (representing one position in Odu)"""
        if broken:
            # Draw broken line (two short segments)
            # Left line of pair
            self.turtle.penup()
            self.turtle.goto(x, y + self.line_height//2)
            self.turtle.pendown()
            self.turtle.goto(x, y + self.line_height//4)
            self.turtle.penup()
            self.turtle.goto(x, y - self.line_height//4)
            self.turtle.pendown()
            self.turtle.goto(x, y - self.line_height//2)
            
            # Right line of pair
            self.turtle.penup()
            self.turtle.goto(x + 10, y + self.line_height//2)
            self.turtle.pendown()
            self.turtle.goto(x + 10, y + self.line_height//4)
            self.turtle.penup()
            self.turtle.goto(x + 10, y - self.line_height//4)
            self.turtle.pendown()
            self.turtle.goto(x + 10, y - self.line_height//2)
        else:
            # Draw solid line pair
            # Left line of pair
            self.turtle.penup()
            self.turtle.goto(x, y + self.line_height//2)
            self.turtle.pendown()
            self.turtle.goto(x, y - self.line_height//2)
            
            # Right line of pair
            self.turtle.penup()
            self.turtle.goto(x + 10, y + self.line_height//2)
            self.turtle.pendown()
            self.turtle.goto(x + 10, y - self.line_height//2)

    def draw_eji_ogbe(self):
        """Draw Eji Ogbe (4 pairs of solid vertical lines)"""
        self.clear_screen()
        
        # Title
        self.turtle.penup()
        self.turtle.goto(-60, 80)
        self.turtle.pendown()
        self.turtle.write("Eji Ogbe - The First Odu", font=("Arial", 14, "bold"))
        
        # Draw 4 pairs of solid lines
        for i in range(4):
            x_pos = i * self.line_spacing - 45
            self.draw_line_pair(x_pos, 0, broken=False)
            
        self.turtle.hideturtle()
        
    def draw_oyeku_meji(self):
        """Draw Oyeku Meji (4 pairs of broken vertical lines)"""
        self.clear_screen()
        
        # Title
        self.turtle.penup()
        self.turtle.goto(-60, 80)
        self.turtle.pendown()
        self.turtle.write("Oyeku Meji - The Second Odu", font=("Arial", 14, "bold"))
        
        # Draw 4 pairs of broken lines
        for i in range(4):
            x_pos = i * self.line_spacing - 45
            self.draw_line_pair(x_pos, 0, broken=True)
            
        self.turtle.hideturtle()
        
    def draw_iwori_meji(self):
        """Draw Iwori Meji (alternating pattern)"""
        self.clear_screen()
        
        # Title
        self.turtle.penup()
        self.turtle.goto(-60, 80)
        self.turtle.pendown()
        self.turtle.write("Iwori Meji - The Third Odu", font=("Arial", 14, "bold"))
        
        # Pattern: broken, solid, broken, solid
        pattern = [True, False, True, False]
        for i, broken in enumerate(pattern):
            x_pos = i * self.line_spacing - 45
            self.draw_line_pair(x_pos, 0, broken=broken)
            
        self.turtle.hideturtle()
        
    def draw_odi_meji(self):
        """Draw Odi Meji"""
        self.clear_screen()
        
        # Title
        self.turtle.penup()
        self.turtle.goto(-60, 80)
        self.turtle.pendown()
        self.turtle.write("Odi Meji - The Fourth Odu", font=("Arial", 14, "bold"))
        
        # Pattern: solid, broken, solid, broken
        pattern = [False, True, False, True]
        for i, broken in enumerate(pattern):
            x_pos = i * self.line_spacing - 45
            self.draw_line_pair(x_pos, 0, broken=broken)
            
        self.turtle.hideturtle()

    def draw_major_odu(self, odu_name: str, pattern: List[bool]):
        """Draw any major Odu given its pattern"""
        self.clear_screen()
        
        # Title
        self.turtle.penup()
        self.turtle.goto(-80, 80)
        self.turtle.pendown()
        self.turtle.write(f"{odu_name}", font=("Arial", 14, "bold"))
        
        # Draw pattern
        for i, broken in enumerate(pattern):
            x_pos = i * self.line_spacing - 45
            self.draw_line_pair(x_pos, 0, broken=broken)
            
        self.turtle.hideturtle()

    def save_as_postscript(self, filename: str):
        """Save the current drawing as PostScript file"""
        if not os.path.exists("static/images/odu"):
            os.makedirs("static/images/odu")
        self.screen.getcanvas().postscript(file=f"static/images/odu/{filename}.eps")

def main():
    """Demonstrate the Odu visualization system"""
    visualizer = OduVisualizer()
    
    # Define the 16 major Odu patterns (True = broken line, False = solid line)
    major_odu = {
        "Eji Ogbe": [False, False, False, False],
        "Oyeku Meji": [True, True, True, True],
        "Iwori Meji": [True, False, True, False],
        "Odi Meji": [False, True, False, True],
        "Irosun Meji": [True, True, False, False],
        "Owonrin Meji": [False, False, True, True],
        "Obara Meji": [True, False, False, True],
        "Okanran Meji": [False, True, True, False],
        "Ogunda Meji": [False, True, False, False],
        "Osa Meji": [True, False, True, True],
        "Ika Meji": [True, True, False, True],
        "Oturupon Meji": [True, True, True, False],
        "Otura Meji": [False, False, False, True],
        "Irete Meji": [True, False, False, False],
        "Ose Meji": [False, True, True, True],
        "Ofun Meji": [False, False, True, False]
    }
    
    print("Odu Ifá Visualization System")
    print("Available Odu:")
    for i, name in enumerate(major_odu.keys(), 1):
        print(f"{i:2d}. {name}")
    
    try:
        choice = input("\nEnter the number of the Odu to visualize (1-16): ")
        choice_num = int(choice)
        
        if 1 <= choice_num <= 16:
            odu_names = list(major_odu.keys())
            selected_odu = odu_names[choice_num - 1]
            pattern = major_odu[selected_odu]
            
            print(f"Drawing {selected_odu}...")
            visualizer.draw_major_odu(selected_odu, pattern)
            
            # Keep window open
            visualizer.screen.exitonclick()
        else:
            print("Invalid choice. Please enter a number between 1 and 16.")
            
    except ValueError:
        print("Invalid input. Please enter a number.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()