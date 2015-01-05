#!/bin/bash
JAVA_HOME=/usr/lib/jvm/java-7-openjdk-amd64/jre
I590TwitterDataset=/home/mongodb/Projects/I590-TwitterDataSet

cd $I590TwitterDataset

for i in $(ls lib |grep jar); do
	CLASSPATH=$CLASSPATH:$I590TwitterDataset/lib/$i
done
for j in $(ls build/lib |grep jar); do
	CLASSPATH=$CLASSPATH:$I590TwitterDataset/build/lib/$j
done
echo $CLASSPATH

while [ "$*" != "" ]
do
  args=$args' '$1
  shift
done
java -classpath $CLASSPATH $args
