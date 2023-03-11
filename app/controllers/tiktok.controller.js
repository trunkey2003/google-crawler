const { default: axios } = require("axios");
const respond = require("../services/respond.service");

const tiktokApis = "https://open.tiktokapis.com/v2";
const CLIENT_KEY = "aw1aqnfsw42rhl1m";
const CLIENT_SECRET = "ccae99cb09bdd1e90cc643d0e77ed71d";

class tiktokController {
  oAuth(req, res, next) {
    try {
      const csrfState = Math.random().toString(36).substring(2);
      // res.cookie("csrfState", csrfState, { maxAge: 60000 });

      let url = "https://open-api.tiktok.com/platform/oauth/connect";

      url += "?client_key=" + CLIENT_KEY;
      url += "&scope=user.info.basic,video.list";
      url += "&response_type=code";
      url += "&redirect_uri=https://beta.reelsights.com/check-token-tiktok";
      url += "&state=" + csrfState;

      res.redirect(url);
    } catch (err) {
      console.log(err);
      respond({ res, statusCode: 500, message: "Internal server error" });
    }
  }

  redirect(req, res) {
    const { code, state } = req.query;
    // const { csrfState } = req.cookies;

    // if (state !== csrfState) {
    //   res.status(422).send("Invalid state");
    //   return;
    // }

    let url_access_token = "https://open-api.tiktok.com/oauth/access_token/";
    url_access_token += "?client_key=" + CLIENT_KEY;
    url_access_token += "&client_secret=" + CLIENT_SECRET;
    url_access_token += "&code=" + code;
    url_access_token += "&grant_type=authorization_code";

    axios
      .post(url_access_token)
      .then((result) => {
        if (result.data?.message !== "success")
          return respond({
            res,
            statusCode: 500,
            message: "Message is not success",
          });
        res.send(result.data);
      })
      .catch((err) => {
        console.log(err);
        respond({ res, statusCode: 500, message: "Internal server error" });
      });
  }

  userInfo(req, res) {
    const { tt_access_token } = req.headers;

    console.log(req.cookies);

    if (!tt_access_token)
      return respond({
        res,
        statusCode: 401,
        message: "Unauthorized, please send tt_access_token",
      });

    let config = {
      headers: {
        Authorization: "Bearer " + tt_access_token,
      },
    };

    let urlUserInfo = tiktokApis + "/user/info/";
    urlUserInfo +=
      "?fields=open_id,union_id,avatar_url,avatar_url_100,avatar_large_url,display_name,bio_description,profile_deep_link,is_verified,follower_count,following_count,likes_count";
    axios
      .get(urlUserInfo, config)
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => {
        console.log(err.message);
        respond({ res, statusCode: 500, message: "Internal server error" });
      });
  }

  videoList(req, res) {
    const { tt_access_token } = req.headers;

    if (!tt_access_token)
      return respond({
        res,
        statusCode: 401,
        message: "Unauthorized, please send tt_access_token",
      });
      
    let config = {
      headers: {
        Authorization: "Bearer " + tt_access_token,
        "Content-Type": "application/json",
      },
    };

    let urlVideoList = tiktokApis + "/video/list/";
    urlVideoList +=
      "?fields=id,create_time,cover_image_url,share_url,video_description,duration,height,width,title,embed_html,embed_link,like_count,comment_count,share_count,view_count";
    axios
      .post(urlVideoList, {}, config)
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => {
        console.log(err.message);
        respond({ res, statusCode: 500, message: "Internal server error" });
      });
  }

  async getVideoAnalysis(req, res, next) {
    try {
      res.send();
    } catch {}
  }
}

module.exports = new tiktokController();
