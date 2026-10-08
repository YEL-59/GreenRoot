import React from "react";
import { WhatWeDoImages } from "./WhatWeDoImages";
import { WhatWeDoSteps } from "./WhatWeDoSteps";
import { WhatWeDoCounters } from "./WhatWeDoCounters";

export const WhatWeDoSection = () => {
  return (
    <div className="what-we-do-gold">
      <div className="container">
        <div className="row">
          {/* Child 1: Left Images */}
          <WhatWeDoImages />

          {/* Child 2: Right Steps */}
          <WhatWeDoSteps />

          {/* Child 3: Bottom 5 Counters */}
          <WhatWeDoCounters />
        </div>
      </div>
    </div>
  );
};
