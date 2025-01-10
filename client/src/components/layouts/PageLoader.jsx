import React from "react";

const PageLoader = () => {
  const vehicles = [
    // 4-wheeler/van
    "M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z",
    // 6-wheeler medium truck
    "M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4H3M17,9.5H19.5L21.47,12H17V9.5M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z",
    // 8-wheeler heavy truck
    "M20,8H15V14H2V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M17,12V9.5H19.5L21.46,12H17M18,7H14V13H3V4H18V7Z",
    // 10-wheeler transport truck
    "M3,13.5L2.25,12H7.5L6.9,10.5H2L1.25,9H7.05L6.5,7.5H1.11L0.25,6H6.5L5.95,4.5H0.11L0,4.13V2A1,1 0 0,1 1,1H13A2,2 0 0,1 15,3L16,7H19A3,3 0 0,1 22,10L21,15H19A3,3 0 0,1 16,18A3,3 0 0,1 13,15H11A3,3 0 0,1 8,18A3,3 0 0,1 5,15H3V13.5M16,13.5A1.5,1.5 0 0,0 14.5,15A1.5,1.5 0 0,0 16,16.5A1.5,1.5 0 0,0 17.5,15A1.5,1.5 0 0,0 16,13.5M8,13.5A1.5,1.5 0 0,0 6.5,15A1.5,1.5 0 0,0 8,16.5A1.5,1.5 0 0,0 9.5,15A1.5,1.5 0 0,0 8,13.5Z",
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700">
      <div className="flex flex-col items-center gap-10 p-8 rounded-lg bg-gray-800/50 backdrop-blur-sm">
        {/* Vehicle showcase area */}
        <div className="relative w-full max-w-3xl h-48">
          {/* Road with moving lines */}
          <div className="absolute bottom-0 w-full h-20 bg-gray-800">
            <div className="relative h-full overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-around">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-16 h-2 bg-white/20 animate-[slideLeft_2.5s_linear_infinite]"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicles */}
          <div className="absolute bottom-16 w-full flex justify-around">
            {vehicles.map((pathData, index) => (
              <svg
                key={index}
                className="w-20 h-20 text-white transform transition-transform animate-bounce"
                style={{
                  animationDuration: "4s",
                  animationDelay: `${index * 0.5}s`,
                  opacity: 0.9,
                  transform: `scale(${1 + index * 0.15})`, // Makes each subsequent vehicle slightly larger
                }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d={pathData} />
              </svg>
            ))}
          </div>
        </div>

        {/* Service type indicators */}
        <div className="grid grid-cols-4 gap-6 p-6 bg-gray-800 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-4 h-4 border-2 border-white rounded-full animate-ping"></div>
            <span className="text-sm text-white font-medium">4-Wheeler</span>
            <span className="text-xs text-gray-400">Delivery Van</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-4 h-4 border-2 border-white rounded-full animate-ping"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <span className="text-sm text-white font-medium">6-Wheeler</span>
            <span className="text-xs text-gray-400">Medium Truck</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-4 h-4 border-2 border-white rounded-full animate-ping"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <span className="text-sm text-white font-medium">8-Wheeler</span>
            <span className="text-xs text-gray-400">Heavy Truck</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-4 h-4 border-2 border-white rounded-full animate-ping"
              style={{ animationDelay: "0.6s" }}
            ></div>
            <span className="text-sm text-white font-medium">10-Wheeler</span>
            <span className="text-xs text-gray-400">Transport</span>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-4">
          <p className="text-2xl text-white font-bold tracking-wide animate-pulse">
            Loading Transport Services
          </p>
          <p className="text-sm text-gray-300">
            Checking available fleet in your area
          </p>
          <div className="flex items-center justify-center gap-1">
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-md h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
