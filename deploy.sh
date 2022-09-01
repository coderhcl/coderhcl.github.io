npm run build

cd public

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/coderhcl/coderhcl.github.io.git master

cd ../

rm -rf public