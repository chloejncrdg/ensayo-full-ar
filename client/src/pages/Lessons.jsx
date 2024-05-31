import React from 'react';
import { Link, useParams } from 'react-router-dom';
import content from '../data/content.json';

const Lessons = () => {
  const { courseId, moduleId, unitId } = useParams();
  
  // Find the corresponding course, module, and unit
  const course = content
    .flatMap(section => section.courses)
    .find(course => course.courseId.toString() === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const module = course.modules.find(module => module.moduleId.toString() === moduleId);

  if (!module) {
    return <div>Module not found</div>;
  }

  const unit = module.units.find(unit => unit.unitId.toString() === unitId);

  if (!unit) {
    return <div>Unit not found</div>;
  }

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <p className='font-sf-bold text-lg text-gray-500'>Module {module.moduleId} &gt; Unit {unit.unitId}</p>
      <h1 className="text-5xl font-sf-bold text-gray-900">{unit.title}</h1>
      
      <div className="mt-12">
        <h2 className="text-xl font-sf-bold text-blue-800">Tools and Equipments</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {unit.toolGroup && unit.toolGroup.length > 0 ? (
            unit.toolGroup.map(toolGroup => (
              <Link
              key={toolGroup.toolGroupId}
              to={`/tools/${courseId}/${moduleId}/${unitId}/${toolGroup.toolGroupId}`}
              className="block"
              >
                <div key={toolGroup.toolGroupId} className="bg-white rounded-lg shadow-md overflow-hidden h-64">
                  <div className="h-2/3">
                    <img
                      src={toolGroup.image}
                      alt={toolGroup.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-1/3 p-4 flex items-center justify-center">
                    <h3 className="text-xl font-sf-bold text-blue-800">{toolGroup.title}</h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="mt-4 text-gray-400">No tools available for this unit</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-sf-bold text-blue-800">Practicals</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {unit.practicalGroup && unit.practicalGroup.length > 0 ? (
            unit.practicalGroup.map(practicalGroup => (
              <div key={practicalGroup.practicalGroupId} className="bg-white rounded-lg shadow-md overflow-hidden h-64">
                <div className="h-2/3">
                  <img
                    src={practicalGroup.image}
                    alt={practicalGroup.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-1/3 p-4 flex items-center justify-center">
                  <h3 className="text-xl font-sf-bold text-blue-800">{practicalGroup.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-400">No practicals available for this unit</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lessons;