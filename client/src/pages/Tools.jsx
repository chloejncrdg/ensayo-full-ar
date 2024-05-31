import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useParams } from 'react-router-dom';
import { ARButton, XR } from "@react-three/xr";

import content from '../data/content.json';
import HitTester from '../xr/HitTester';

const Tools = () => {
  const { courseId, moduleId, unitId, toolGroupId } = useParams();
  const [selectedTool, setSelectedTool] = useState(null);
  const [canvasKey, setCanvasKey] = useState(0);

  const toolGroup = content
    .flatMap(section => section.courses)
    .find(course => course.courseId.toString() === courseId)?.modules
    .find(module => module.moduleId.toString() === moduleId)?.units
    .find(unit => unit.unitId.toString() === unitId)?.toolGroup
    .find(group => group.toolGroupId.toString() === toolGroupId);

  useEffect(() => {
    if (toolGroup && toolGroup.tools.length > 0) {
      setSelectedTool(toolGroup.tools[0]); // Set the first tool as the selected tool
      setCanvasKey(Date.now()); // Initialize the canvas key
    }
  }, [toolGroup]);

  if (!toolGroup) {
    return <div>Tool Group not found</div>;
  }

  const handleToolChange = (event) => {
    const toolId = event.target.value;
    const tool = toolGroup.tools.find(tool => tool.toolId.toString() === toolId);
    setSelectedTool(tool);
    setCanvasKey(Date.now()); // Update the canvas key to force re-render
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
    setCanvasKey(Date.now()); // Update the canvas key to force re-render
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      <h1 className="text-5xl font-sf-bold text-gray-900">{toolGroup.title}</h1>

      <div className="flex flex-col sm:flex-row mt-8">
        <div className="w-full sm:w-1/3 mb-4 sm:mr-4 sm:h-96 overflow-auto">
          <h2 className="text-xl font-sf-bold text-blue-800 mb-4">Select to view:</h2>
          {/* Display buttons for larger screens */}
          <div className="hidden sm:block">
            {toolGroup.tools.map(tool => (
              <button 
                key={tool.toolId}
                onClick={() => handleToolClick(tool)}
                className={`w-full mb-2 p-2 border rounded-md text-left text-gray-700 font-sf-regular ${selectedTool && selectedTool.toolId === tool.toolId ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
              >
                {tool.name}
              </button>
            ))}
          </div>
          {/* Display select dropdown for smaller screens */}
          <div className="sm:hidden">
            <select
              onChange={handleToolChange}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-700 font-sf-regular"
              value={selectedTool ? selectedTool.toolId : ""}
            >
              {toolGroup.tools.map(tool => (
                <option key={tool.toolId} value={tool.toolId}>
                  {tool.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full sm:w-2/3 flex justify-center items-center">
          <div className="w-full h-[70vh] bg-gray-100 flex justify-center items-center">
            {/* This is where the 3D model would be rendered */}
            {selectedTool ? (
              selectedTool.modelPath ? (
                <Suspense fallback={<div className="flex justify-center items-center h-full font-sf-regular">Loading model...</div>}>
                  <Canvas key={canvasKey}>
                    <ambientLight intensity={0.4}/>
                    <directionalLight
                      castShadow
                      position={[1, 10, 1]}
                      intensity={4}
                      shadow-mapSize-width={1024}
                      shadow-mapSize-height={1024}
                      shadow-camera-far={50}
                      shadow-camera-left={-10}
                      shadow-camera-right={10}
                      shadow-camera-top={10}
                      shadow-camera-bottom={-10}
                      shadow-camera-near={0.1}
                    />
                    <directionalLight
                      position={[1, -10, -1]} 
                      intensity={2} 
                    />
                     <directionalLight
                      position={[-1, 0, 1]} 
                      intensity={1.3}
                      color="#D68270" 
                    />
                    <XR>
                      <HitTester selectedTool={selectedTool}/>
                    </XR>
                  </Canvas>
                  <ARButton
                    className="ar-button"
                    sessionInit={{
                      requiredFeatures: ["hit-test"],
                    }}
                  />
                </Suspense>
              ) : (
                <div className="text-center text-gray-700 font-sf-regular">3D model of {selectedTool.name} not yet available</div>
              )
            ) : (
              <div className="text-center text-gray-700">No tool selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
