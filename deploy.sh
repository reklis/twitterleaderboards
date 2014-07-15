#!/usr/bin/env bash
grunt
#s3cmd -P -c .s3cfg sync ./dist/ s3://twitterleaderboards
s3cmd -P -c .s3cfg sync ./dist/ s3://www.twitterleaderboards.com
git tag -f $(date '+%Y-%m-%d')
