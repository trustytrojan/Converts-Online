"use client";
import { apiroot3 } from "./apiroot";
import JSZip from "jszip";
import axios from "axios";

async function fetchFile(url, fileName, toast) {
  var t;
  try {
    t = toast.loading("Downloading " + fileName, { hideProgressBar: false });
    var response = await axios.get(url, {
      responseType: "blob",
      onDownloadProgress: function (progressEvent) {
        if (progressEvent.lengthComputable) {
          const progress = progressEvent.loaded / progressEvent.total;
          toast.update(t, { progress });
        }
      },
    });
    toast.done(t);
    return response.data;
  } catch (error) {
    toast.done(t);
    return undefined;
  } finally {
    toast.done(t);
  }
}

function downloadFile(url, fileName) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName;
  a.filename = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function downloadSong(props) {
  const zip = new JSZip();

  // @trustytrojan: avoid slashes in filesystem paths
  props.title = props.title.replaceAll('/', '_').replaceAll('\\', '_');

  // @trustytrojan: AstroDX won't recognize raw files not in a folder
  const songFolder = zip.folder(props.title);

  const track = await fetchFile(
    apiroot3 + "/" + props.id + "/track?proxy=1",
    "track.mp3",
    props.toast,
  );

  if (track == undefined) {
    props.toast.error(props.title + "下载失败");
    return;
  }

  const bg = await fetchFile(
    apiroot3 + "/" + props.id + "/image?fullImage=true&proxy=1",
    "bg",
    props.toast,
  );

  if (bg == undefined) {
    props.toast.error(props.title + "下载失败");
    return;
  }

  const maidata = await fetchFile(
    apiroot3 + "/" + props.id + "/chart?proxy=1",
    "maidata",
    props.toast,
  );

  if (maidata == undefined) {
    props.toast.error(props.title + "下载失败");
    return;
  }

  const video = await fetchFile(
    apiroot3 + "/" + props.id + "/video?proxy=1",
    "bg.mp4",
    props.toast,
  );

  songFolder.file("track.mp3", track);
  songFolder.file("bg.jpg", bg);
  songFolder.file("maidata.txt", maidata);

  if (video != undefined) {
    songFolder.file("pv.mp4", video);
  }

  /*var downloadExtension = localStorage.getItem("DownloadType");
  if (downloadExtension == undefined) {
    downloadExtension = "zip";
  }*/
  const downloadExtension = 'adx';

  zip.generateAsync({ type: "blob" }).then((blob) => {
    const blb = new Blob([blob], { type: "application/" + downloadExtension });
    const url = URL.createObjectURL(blb);
    props.toast.success(props.title + "下载成功");
    downloadFile(url, props.title + '.' + downloadExtension);
  });
}
