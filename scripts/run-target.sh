#/bin/sh

TARGET="$1"

echo Check $TARGET ...

which $TARGET | grep -v 'not found' > /dev/null

if [ "$?" == "1" ]; then
  echo "Target $TARGET not found."
  echo "Please check if $TARGET is already installed."
  exit 1
fi

PIDS=`ps -ef | grep $TARGET | grep -v grep | grep -v .sh | awk '{print $2}'`
if [ "$PIDS" == "" ]; then
  echo "$TARGET is not running, please run $TARGET first."
  exit 1
else
  echo "$TARGET is running, pid: $PIDS"
fi
