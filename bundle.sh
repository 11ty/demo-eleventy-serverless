echo "Bundling the Eleventy Cloud Netlify Function"

mkdir -p ./netlify/functions/cloud/src/

# Move Netlify Function definition
cp ./netlify/cloud.js ./netlify/functions/cloud/index.js

# Config
cp .eleventy.js ./netlify/functions/cloud/

# Build files
cp -R src/ ./netlify/functions/cloud/src/

echo "Finished copying"