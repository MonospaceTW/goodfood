### 安裝 Git LFS
至官網下載安裝檔
[官網](https://git-lfs.github.com/)

解壓縮後cd至該資料夾

1.

  cd ~/Downloads/git-lfs-1.X.X

2.

  ./install.sh

3.

  git lfs install

4.

  git lfs track "*.psd"

5.

  git add .gitattributes

6.一樣的git 操作

```
git add file.psd 
git commit -m "Add design file" 
git push origin master
```

