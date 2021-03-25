echo "Bundling the Eleventy Cloud Netlify Function"

mkdir -p ./netlify/functions/cloud/src/

# Move Netlify Function definition
cp -v ./netlify/cloud.js ./netlify/functions/cloud/index.js

# Config
cp -v .eleventy.js ./netlify/functions/cloud/

# Build files
cp -R -v ./src ./netlify/functions/cloud/

echo "Finished copying"