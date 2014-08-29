<?php

    if(isset($_POST['user'])) {
        $user = $_POST['user'];
    } else {
        $user = '匿名';
    }

    if(isset($_POST['content'])) {
        $content = $_POST['content'];
    } else {
        $content = '你说我说点什么好呢？哇咔咔';
    }

    $data = array(
                'state' => 'success',
                'msg' => '发布成功',
                'comment' => array(
                    'user' => $user,
                    'time' => '刚刚',
                    'content' => $content
                )
            );

    /*$data = array(
                'state' => 'error',
                'msg' => '发布失败'
            );*/

    echo json_encode($data);
?>