<?php

include('../classes.php');

    header("Access-Control-Allow-Origin: *");

	session_start();

	$access = @$_SESSION['access'] != false;
	
	$req = new Request();
	$auth = new Auth();
	$data = json_decode($_POST['data']);


	switch(true) {
	case isset($_GET["logout"]):
		$_SESSION['access'] = false;
		j(['loggedIn' => false]);
		exit;
	}

	if($access) {
		switch(true) {
		case isset($_GET["loadlist"]):
			$loadResult = $req->loadList();
			j($loadResult);

		case isset($_GET["login"]):
			j(array_merge($_SESSION['access'], ['loggedIn' => true]));

		case isset($_GET['logout']):
			$_SESSION['access'] = false;
			j(['loggedIn' => false]);

		case isset($_GET['getCurrent']) && !isset($_GET['HomePage']):
			j(['user' => $_SESSION['access']]);

		case isset($_GET['getCurrent']):
			$peoples = $req->loadList($_SESSION['access']['id']);
			j(['user' => $_SESSION['access'], 'peoples' => $peoples['peoples']]);

		case isset($_GET['save']):
			$save = $req->save($data->id, $data->name, $data->date, $data->tags, $_SESSION['access']['id']);
			if($save['error'])
			j(['error' => $save['error'], 'step' => $save['step']]);
			$updatedPeople = $req->loadList($_SESSION['access']['id'], isset($save['insert_id']) ? $save['insert_id'] : $data->id);
			j(['error' => false, 'people' => $updatedPeople['peoples']]);

		case isset($_GET['remove']):
			$remove = $req->remove($data->id, $_SESSION['access']['id']);
			j(['error' => $remove['error']]);
		}
	}


	if(!$access) {
		switch(true) {
		case isset($_GET["login"]):
			if($data->username==null || $data->password==null) {
				exit(json_encode(['loggedIn' => false]));
			}
			$login = $auth->login($data->username, $data->password);
			$_SESSION['access'] = $login ? $login : false;
			j($login ? array_merge($login, ['loggedIn' => true]) : ['loggedIn' => false]);

		case isset($_GET['getCurrent']):
			j(['user' => $_SESSION['access']]);

		case isset($_GET['register']):
			$username = $data->username;
			$password = $data->password;
			$register = $auth->register($username, $password);
			if(!$register['error']) {
				$req->copyPeoples([88, 89, 90, 91, 92], $register['id']);
				$_SESSION['access'] = ['id' => $register['id'], 'username' => $username];
				j(array_merge($register, ['loggedIn' => true, 'username' => $username, 'id' => $register['id']]));
			}
			j($register);
		}
	}


function j($obj) {
	echo json_encode($obj);
	exit;
}

?>