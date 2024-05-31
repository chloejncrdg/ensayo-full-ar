import React from 'react';
import { Link, useParams } from 'react-router-dom';
import content from '../data/content.json';

const Units = () => {
  const { courseId, moduleId } = useParams();
  const course = content
    .flatMap(section => section.courses)
    .find(course => course.courseId.toString() === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const module = course.modules.find(module => module.moduleId === parseInt(moduleId));

  if (!module) {
    return <div>Module not found</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <p className='font-sf-bold text-lg text-gray-500'>Core Competency &gt; Module {module.moduleId}</p>
      <h1 className="text-4xl font-sf-bold text-gray-900">{module.title}</h1>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {module.units && module.units.length > 0 ? (
          module.units.map(unit => (
            <Link
              key={unit.unitId}
              to={`/lessons/${courseId}/${moduleId}/${unit.unitId}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <img
                      src={unit.image}
                      alt={unit.title}
                      className="w-full h-3/4 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className='font-sf-bold text-sm text-gray-500 px-3'>UNIT {unit.unitId}</p>
                    <p className="text-lg font-sf-bold text-blue-800 px-3">{unit.title}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="mt-4 text-gray-400">No units available for this module</p>
        )}
      </div>
    </div>
  );
};

export default Units;

