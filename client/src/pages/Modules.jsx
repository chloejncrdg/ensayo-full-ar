import React from 'react';
import { Link, useParams } from 'react-router-dom';
import content from '../data/content.json';

const Modules = () => {
  const { courseId } = useParams();
  const course = content
    .flatMap(section => section.courses)
    .find(course => course.courseId.toString() === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <p className='font-sf-bold text-xl text-gray-500'>Course</p>
      <h1 className="text-5xl font-sf-bold text-gray-900">{course.title}</h1>
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {course.modules && course.modules.length > 0 ? (
          course.modules.map((module) => (
            <Link
              key={module.moduleId}
              to={`/units/${courseId}/${module.moduleId}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <img
                      src={module.image}
                      alt={module.title}
                      className="w-full h-3/4 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-sf-bold text-blue-800">{module.title}</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="mt-4 text-gray-400">No modules available for this course</p>
        )}
      </div>
    </div>
  );
};

export default Modules;
