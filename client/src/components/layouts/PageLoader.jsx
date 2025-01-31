import React from "react";

const PageLoader = () => {
  const vehicles = [
    // Regular Car
    "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,11.61V16.5A1,1 0 0,0 4,17.5A1,1 0 0,0 5,16.5V16H19V16.5A1,1 0 0,0 20,17.5A1,1 0 0,0 21,16.5V11.61L18.92,6Z",

    // Big Car (SUV)
    "M5,11L6.5,6.5H17.5L19,11M17.5,16A1.5,1.5 0 0,1 16,14.5A1.5,1.5 0 0,1 17.5,13A1.5,1.5 0 0,1 19,14.5A1.5,1.5 0 0,1 17.5,16M6.5,16A1.5,1.5 0 0,1 5,14.5A1.5,1.5 0 0,1 6.5,13A1.5,1.5 0 0,1 8,14.5A1.5,1.5 0 0,1 6.5,16M18.92,6C18.72,5.42 18.16,5 17.5,5H6.5C5.84,5 5.28,5.42 5.08,6L3,11.61V16.5A1,1 0 0,0 4,17.5A1,1 0 0,0 5,16.5V16H19V16.5A1,1 0 0,0 20,17.5A1,1 0 0,0 21,16.5V11.61L18.92,6Z M4,11V8H20V11H4Z",

    // Traveller TT (Tempo Traveller)
    "M3,4A2,2 0 0,0 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8H17V4H3M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5M17,7H19L21.5,10H17V7Z M4,10V6H15V10H4Z",

    // Bus
    "M4,16C4,16.88 4.39,17.67 5,18.22V20A1,1 0 0,0 6,21H7A1,1 0 0,0 8,20V19H16V20A1,1 0 0,0 17,21H18A1,1 0 0,0 19,20V18.22C19.61,17.67 20,16.88 20,16V6C20,2.5 16.42,2 12,2C7.58,2 4,2.5 4,6V16M7.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,14A1.5,1.5 0 0,1 9,15.5A1.5,1.5 0 0,1 7.5,17M16.5,17A1.5,1.5 0 0,1 15,15.5A1.5,1.5 0 0,1 16.5,14A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 16.5,17M18,11H6V6H18V11Z",
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
