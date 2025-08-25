import React from 'react';
import { Code, Home, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Computer Architecture</span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <a href="#/" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Home className="mr-1 h-5 w-5" />
                Home
              </a>
              <a href="#/visualization" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Memory Visualization
              </a>
              <a href="#/problem3" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Problem 3
              </a>
              <a href="#/problem4" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Problem 4
              </a>
              <a href="#/problem5" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Problem 5
              </a>
              <a href="#/problem5-correct" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Problem 5 (Correct)
              </a>
              <a href="#/problem6" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Problem 6
              </a>
              <a href="#/pointer-casting" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <Code className="mr-1 h-5 w-5" />
                Pointer Casting
              </a>
              <a href="#/midterm-answers" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <BookOpen className="mr-1 h-5 w-5" />
                Midterm Answers
              </a>
              <a href="#/docs" className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md">
                <BookOpen className="mr-1 h-5 w-5" />
                Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

