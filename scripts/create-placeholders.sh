#!/bin/bash

# Create required directories
mkdir -p public/images/{gallery/{signature-dishes,events,behind-scenes,catering-setup},menu/{proteins,sides}}

# Function to create SVG placeholder
create_svg() {
    local file=$1
    local title=$2
    local focus=$3
    
    echo "<svg width=\"1200\" height=\"800\" xmlns=\"http://www.w3.org/2000/svg\">
  <rect width=\"100%\" height=\"100%\" fill=\"#5D2E8C\"/>
  <text x=\"50%\" y=\"50%\" font-family=\"Arial\" font-size=\"48\" fill=\"white\" text-anchor=\"middle\">
    $title Photo (1200x800)
  </text>
  <text x=\"50%\" y=\"60%\" font-family=\"Arial\" font-size=\"24\" fill=\"#DAB03C\" text-anchor=\"middle\">
    Focus: $focus
  </text>
</svg>" > "$file"
}

# Create gallery placeholders
create_svg "public/images/gallery/signature-dishes/brisket-platter.svg" "Signature Brisket Platter" "Close-up of sliced brisket with visible smoke ring"
create_svg "public/images/gallery/events/corporate-lunch.svg" "Corporate Event" "Wide shot of buffet setup with guests"
create_svg "public/images/gallery/behind-scenes/smoking-process.svg" "Smoking Process" "Early morning smoke with dramatic lighting"
create_svg "public/images/gallery/behind-scenes/prep-kitchen.svg" "Prep Kitchen" "Team preparing sides with professional equipment"
create_svg "public/images/gallery/catering-setup/buffet-setup.svg" "Buffet Setup" "Professional buffet presentation"
create_svg "public/images/gallery/catering-setup/carving-station.svg" "Carving Station" "Live carving station operation"

# Create menu placeholders
create_svg "public/images/menu/proteins/brisket.svg" "Brisket" "Close-up with natural lighting"
create_svg "public/images/menu/proteins/ribs.svg" "Ribs" "Full rack presentation"
create_svg "public/images/menu/proteins/pulled-pork.svg" "Pulled Pork" "Texture detail shot"
create_svg "public/images/menu/proteins/chicken.svg" "Chicken" "Half chicken with glaze"
create_svg "public/images/menu/proteins/burnt-ends.svg" "Burnt Ends" "Close-up of glazed cubes"

create_svg "public/images/menu/sides/mac-cheese.svg" "Mac and Cheese" "Creamy texture with crispy top"
create_svg "public/images/menu/sides/collard-greens.svg" "Collard Greens" "Fresh and vibrant presentation"
create_svg "public/images/menu/sides/cornbread.svg" "Cornbread" "Golden brown with honey butter"
create_svg "public/images/menu/sides/coleslaw.svg" "Purple Slaw" "Fresh, colorful presentation"

echo "Created placeholder images for photography guide"