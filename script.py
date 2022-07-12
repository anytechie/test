import os

# go through all the folders in the directory and go through all the files ending with .xml
# change relativeToChangelogFile="true" to relativeToChangelogFile="false"
# and replace path="./ with path="classpath:/${directory}/

for folder in os.listdir("."):
    if os.path.isdir(folder):
        for file in os.listdir(folder):
            if file.endswith(".xml"):
                print("Changing " + file)
                with open(folder + "/" + file, "r") as f:
                    content = f.read()
                content = content.replace("relativeToChangelogFile=\"true\"", "relativeToChangelogFile=\"false\"")
                content = content.replace("path=\"./", "path=\"classpath:/${directory}/")
                with open(folder + "/" + file, "w") as f:
                    f.write(content)
                print("Changed " + file)
            else:
                print("Skipping " + file)
    else:
        print("Skipping " + folder)
