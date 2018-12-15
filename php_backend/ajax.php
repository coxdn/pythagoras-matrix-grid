<?php

	include('classes.php');

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
		// case isset($_GET["save"]):
		// 	$savedID = $req->doSave($_POST['name'], $_POST['datebirth']);
		// 	j(array('insert_id' => $savedID)).'___@@@___';
		//     break;

		// case isset($_GET["remove"]):
		// 	$result = $req->remove($_POST['id']);
		// 	j($result).'___@@@___';
		// 	break;

		// case isset($_GET["search"]):
		// 	$searchResult = $req->doSearch($_POST['str']);
		// 	j($searchResult);//.'___@@@___';
		// 	break;

		case isset($_GET["loadlist"]):
			$loadResult = $req->loadList();
			j($loadResult);//.'___@@@___';
			break;

		case isset($_GET["login"]):
			j(array_merge($_SESSION['access'], ['loggedIn' => true]));
			break;

		case isset($_GET['logout']):
			$_SESSION['access'] = false;
			j(['loggedIn' => false]);
			break;

		case isset($_GET['getCurrent']):
			$peoples = $req->loadList($_SESSION['access']['id']);
			j(['user' => $_SESSION['access'], 'peoples' => $peoples['peoples']]);
			break;

		case isset($_GET['save']):
			$save = $req->save($data->id, $data->name, $data->date, $data->tags, $_SESSION['access']['id']);
			if($save['error'])
			j(['error' => $save['error'], 'step' => $save['step']]);
			$updatedPeople = $req->loadList($_SESSION['access']['id'], isset($save['insert_id']) ? $save['insert_id'] : $data->id);
			j(['error' => false, 'people' => $updatedPeople['peoples']]);
			break;
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
			break;

		case isset($_GET['getCurrent']):
			j(['user' => $_SESSION['access']]);
			break;

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
			break;
		}
	}


function j($obj) {
	echo json_encode($obj);
	exit;
}

?>