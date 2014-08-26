<?php
    $data = array(
                'state' => 'success',
                'msg' => '发布成功',
                'comment' => array(
                    'user' => '贺乙钊',
                    'time' => '刚刚',
                    'content' => '你说我说点什么好呢？哇咔咔'
                )
            );

    /*$data = array(
                'state' => 'error',
                'msg' => '发布失败'
            );*/

    echo json_encode($data);
?>