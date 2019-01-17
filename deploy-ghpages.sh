if [ $CIRCLE_BRANCH == $SOURCE_BRANCH ]; then
    git config --global user.email '937931249@qq.com'
    git config --global user.name 'StuRuby'

    git clone $CIRCLE_REPOSITORY_URL out

    cd out
    git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
    git rm -rf .
    cd ..

    npm run build

    cp -a dist/. out/.

    mkdir -p out/.circleci && cp -a .circleci/. out/.circleci/.
    cd out

    git add -A
    git commit -m "Automated deployment to GitHub Pages: ${CIRCLE_SHA1}" --allow-empty

    git push origin $TARGET_BRANCH
fi