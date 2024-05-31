import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import content from '../data/content.json';



const Dashboard = () => {

  const [courseSectionState, setCourseSectionState] = useState({});

  const toggleCourses = (courseSectionId) => {
    setCourseSectionState((prevState) => ({
      ...prevState,
      [courseSectionId]: !prevState[courseSectionId],
    }));
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <p className='font-sf-bold text-xl text-gray-500'>Dashboard</p>
      <h1 className="text-5xl font-sf-bold text-gray-900">Course Section</h1>
      {content.map((courseSection) => (
        <div key={courseSection.courseSectionId} className="my-4">
          <div className="rounded-full border border-gray-300 p-2 px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-lg">
                <p className='font-sf-bold text-xl text-blue-800'>{courseSection.title}</p>
              </h1>
              <button
                onClick={() => toggleCourses(courseSection.courseSectionId)}
                className="px-2 py-2 text-white rounded-md font-sf-regular text-sm flex items-center"
              >
                <div className="bg-gray-700 rounded-full p-2 flex justify-center items-center">
                  {courseSectionState[courseSection.courseSectionId] ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 15a1 1 0 01-.707-.293l-5-5a1 1 0 011.414-1.414L10 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 15z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a1 1 0 01.293-.707l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 01-1.414 1.414l-5-5A1 1 0 013 10z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
          {courseSectionState[courseSection.courseSectionId] && courseSection.courses && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {courseSection.courses.map((course) => (
                <div
                  key={course.courseId}
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-opacity ${
                    courseSectionState[courseSection.courseSectionId] ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <Link to={`/modules/${course.courseId}`} className="font-sf-bold text-lg text-blue-800 block mb-2">
                      {course.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {courseSectionState[courseSection.courseSectionId] &&
            (!courseSection.courses || courseSection.courses.length === 0) && (
              <p className="mt-4 font-sf-regular text-gray-400">No courses available for this section</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
