	yarn install
	git checkout develop
	git pull origin develop
	git checkout master
	git merge develop
	standard-version
	git push origin master
	git push origin develop
	git push --follow-tags origin master
	git checkout develop
	git rebase master
	git push --follow-tags origin develop