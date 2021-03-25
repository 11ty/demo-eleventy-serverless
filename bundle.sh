echo "Bundling the Eleventy Cloud Netlify Function"

# Recursively make directories
mkdir -p ./netlify/functions/cloud/src/

# Config
cp -v .eleventy.js ./netlify/functions/cloud/

# Build files
cp -R -v ./src ./netlify/functions/cloud/

echo "Finished copying"