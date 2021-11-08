# How to use git ([more information](https://sabarada.tistory.com/75))

## For experts

1. initial setting
    * `git config --global user.name "$user-name$"`
    * `git config --global user.email "$user-email$"`
    * `cd $repo-path$`
    * `git init`
    * `git checkout -b $branch-name$`(default branch is main)
    * `git remote add $repo-url-nickname$ $repo-url$`

2. main use
    * `git add $file-name$` (or `git add .` for all)
    * `git commit -m "$commit-contents$"`
    * `git push $repo-url-nickname$ $branch-name$` (check $repo-nickname$ : `git remote -v`)

## For beginners

1. initial setting
    * `git config --global user.name "$user-name$"` (to unset : `git config --global --unset $user.name`)
    * `git config --global user.email "$user-email$"`
    * `git config --list` (or `git config -l`)
    * `cd $repo-path$` (to move other drive : `cd :$drive name$`)
    * `git init`
    * `git checkout -b $branch-name$` (for us, branch name is "main")
    * `git remote add $repo-url-nickname$ $repo-url$` (to remove: `git remote remove $repo-url-nickname$`)
    * `git remote -v`
    * `git log --oneline`
2. main use
    * `git status`
    * `git add $file-name$` (or `git add .` for all)
    * `git status`
    * `git commit -m "$commit-contents$"` ( -am for file change, -m for file addition)
    * `git log --oneline`(press `q` to quit log)
      * we could see `HEAD -> $branch-name$` and `$repo-url-nickname$/$branch-name$`
      * `$repo-rul-nickname$/$branch-name$` is last log that you pushed to github  
      * `HEAD -> $branch-name$` is last log that you committed on your local system
      * between them is logs that you committed and not pushed to github  
    * `git push $repo-url-nickname$ $branch-name$`
    * login to your github account to push
      * when you once login github, git automatically save the data with credential
      * you could see saved data with command `git credential fill` and `url=https://github.com`  
      * If you want to remove this saved data, go to windows credential
