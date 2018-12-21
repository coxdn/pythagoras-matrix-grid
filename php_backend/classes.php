<?php

include('db.config.php');

class Database {
	private $_host = DB_HOST;
	private $_username = DB_USER;
	private $_password = DB_PASSWORD;
	private $_database = DB_NAME;
	public $link;


	function connect($link = 'db_link') {
		$this->link = mysql_connect($this->_server, $this->_username, $this->_password);

		if ($this->link) mysql_select_db($this->_database);

		return $this->link;
	}


	function query($query, $link = 'db_link') {
		// $time_start = explode (' ', microtime());
		// list($usec, $sec) = explode(" ", microtime());

		
		$result = mysql_query($query) or $this->error($query, mysql_errno(), mysql_error());

		// if (defined('STORE_DB_TRANSACTIONS') && (STORE_DB_TRANSACTIONS == 'true')) {
		// 	$result_error = mysql_error();
		// 	error_log('RESULT ' . $result . ' ' . $result_error . "\n", 3, STORE_PAGE_PARSE_TIME_LOG);
		// }

		if (!$result) {
			return mysql_error();
		  	// tep_db_error($query, mysql_errno(), mysql_error());
		}

		return $result;
	}

	function insert_id($link = 'db_link') {
		if($link=="db_link") $link = $this->link;
		return mysql_insert_id($link);
	}

	function error($query, $errno, $error) {
		return "QUERY: ".$query."\r\n#".$errno."\r\n".$error;
	}

	function num_rows($query) {
		return mysql_num_rows($query);
	}

	function fetch_array($query) {
		return mysql_fetch_array($query);
	}

	function ads($s) {
		return addslashes($s);
	}
}
	

class Request {
	private $db;
	private $mysql;

	function Request() {
		$this->db = new Database();
		$this->mysql = $this->db->connect();
	}

	function loadList($user_id, $people_id = false) {
		$userid = $this->db->ads($user_id);

		$querystring = "SELECT b.* FROM birthdates b
			WHERE b.user_id='$user_id'" . ($people_id ? " AND b.id=" . (int)$people_id : "") . "
			ORDER BY b.peoplename ASC";
		$sql_query = $this->db->query($querystring);

		$peoples = $ids = array();
		while($row = $this->db->fetch_array($sql_query)) {
			$ids[] = $row['id'];
			$peoples[] = array(
				'value' => $row['id'],
				'name' => $row['peoplename'],
				'date' => $row['birthdate']
			);
		}

		if(!count($ids)) return false;
		
		$tags = [];
		$querystring = "SELECT bt.* FROM birthdates_tags bt
			LEFT JOIN birthdates b ON b.id=bt.people_id
			WHERE b.user_id = '$user_id'" . ($people_id ? " AND b.id=" . (int)$people_id : "") . "
			ORDER BY bt.id ASC";
		// var_dump($querystring);
		$sql_query = $this->db->query($querystring);
		while($row = $this->db->fetch_array($sql_query)) {
			if(!isset($tags[$row['people_id']])) $tags[$row['people_id']] = [];
			$tags[$row['people_id']][] = ['id' => $row['id'], 'value' => $row['tag']];
		}
		// var_dump($tags['12']);

		$peoples = array_map(function($name) use($tags) {
			$tags_ = $tags[$name['value']];
			return array_merge($name, ['tags' => (count($tags_) ? $tags_ : [])]);
		}, $peoples);
		// var_dump($tags);
		return ['peoples' => $peoples];
	}


	function search($str) {
		$str = trim($this->db->ads($str));
		$querystring = "SELECT b.*, bt.tag FROM birthdates b
			LEFT JOIN birthdates_tags bt ON bt.people_id=b.id AND bt.tag LIKE '%$str%'
			WHERE b.peoplename LIKE '%$str%' OR b.birthdate LIKE '%$str%' OR bt.tag LIKE '%$str%'
			GROUP BY b.id
			ORDER BY b.peoplename ASC";
		$sql_query = $this->db->query($querystring);
		$names = $ids = [];
		while($row = $this->db->fetch_array($sql_query)) {
			$ids[] = $row['id'];
			$names[] = [
				'id' => $row['id'],
				'peoplename' => $row['peoplename'],
				'birthdate' => $row['birthdate'],
				'tagfound' => $row['tag']
			];
		}

		if(!count($ids)) return [];  
		  
		$tags = [];
		$querystring = "SELECT * FROM birthdates_tags
			WHERE people_id IN ('" . implode($ids, "', '") . "')
			ORDER BY id ASC";
		$sql_query = $this->db->query($querystring);
		while($row = $this->db->fetch_array($sql_query)) {
			if(!isset($tags[$row['people_id']])) $tags[$row['people_id']] = [];
			$tags[$row['people_id']][] = ['id' => $row['id'], 'tag' => $row['tag']];
		}

		return ['names' => $names, 'tags' => $tags];
	}

	function save($id, $name, $date, $tags, $user_id) {
		$id = (int)$id;
		$name = substr($this->db->ads($name), 0, 255);
		$date = substr(preg_replace('@[^\d\.]@', '', $this->db->ads($date)), 0, 10);

		if($id) {
			$checkUser = $this->checkOwnershipUser($id, $user_id);
			if($checkUser['error']) return $checkUser;
		}

		$tag_ids = array_map(function($item) {
			return $item->value;
		}, array_filter($tags, function($item) {
			return isset($item->value);
		}));

		$query = "SELECT bt.id
			FROM birthdates b, birthdates_tags bt
			WHERE b.id=bt.people_id AND b.id='$id' AND b.user_id='$user_id'";
		$q = $this->db->query($query);
		$tag_ids_DB = [];
		if($this->db->num_rows($q))
		while($row = $this->db->fetch_array($q))
			$tag_ids_DB[] = $row['id'];
		$tag_ids_diff = array_diff($tag_ids, $tag_ids_DB);
		if(count($tag_ids_diff))
			return ['error' => true, 'step' => $tags];

		$tag_ids_to_remove = array_diff($tag_ids_DB, $tag_ids);
		$q = $this->db->query("DELETE FROM birthdates_tags WHERE id IN (" . implode(", ", $tag_ids_to_remove) . ")");

		if($id)
			// edit old people
			$q = $this->db->query("UPDATE birthdates SET peoplename='$name', birthdate='$date', dt_updated=NOW() WHERE id='$id'");
		else {
			// insert new people
			$q = $this->db->query("INSERT INTO birthdates (user_id, peoplename, birthdate)
				VALUES ('$user_id', '$name', '$date')");
			$insert_id = $this->db->insert_id();
		}

		foreach($tags as $tag) {
			$tag_text = $this->db->ads($tag->label);
			if(isset($tag->value)) {
				$tag_id = (int)$tag->value;
				$q = $this->db->query("UPDATE birthdates_tags SET tag='$tag_text' WHERE id='$tag_id'");
			} else {
				$q = $this->db->query("INSERT INTO birthdates_tags (tag, people_id)
					VALUES ('$tag_text', " . (isset($insert_id) ? $insert_id : $id) . ")");
			}
		}
		if($id)
			return ['error' => false];
		return ['error' => false, 'insert_id' => $insert_id];
	}

	function remove($id, $user_id) {
		$checkUser = $this->checkOwnershipUser($id, $user_id);
		if($checkUser['error'])
			return $checkUser;
		$id = $this->db->ads($id);
		$querystring = "DELETE FROM birthdates WHERE id='$id'";
	    $sql_query = $this->db->query($querystring);
	    $querystring = "DELETE FROM birthdates_tags WHERE people_id='$id'";
	    $sql_query = $this->db->query($querystring);
	    return ['error' => false];
	}

	private function checkOwnershipUser($id, $user_id) {
		$id = $this->db->ads($id);
		$q = $this->db->query("SELECT user_id FROM birthdates WHERE id='$id'");
		if(!$this->db->num_rows($q))
			return ['error' => true, 'step' => 'auth1'];
		$row = $this->db->fetch_array($q);
		if($row['user_id']!=$user_id)
			return ['error' => true, 'step' => 'auth2'];
		return ['error' => false];
	}

	private function isPeopleExists($id) {
		$q = $this->db->query("SELECT count(1) cnt FROM birthdates b WHERE b.id='$id'");
		$row = $this->db->fetch_array($q);
		return $row['cnt']!=0;
	}

	function copyPeoples($idArr, $user_id) {
		foreach($idArr as $id) {
			if(!$this->isPeopleExists($id)) continue;
			$q = $this->db->query("INSERT INTO birthdates (user_id, peoplename, birthdate)
				SELECT '$user_id', b.peoplename, b.birthdate FROM birthdates b WHERE b.id='$id'");
			$insert_id = $this->db->insert_id($q);
			$q = $this->db->query("INSERT INTO birthdates_tags (tag, people_id)
				SELECT bt.tag, '$insert_id' FROM birthdates_tags bt WHERE bt.people_id='$id'");
		}
		return true;
	}
}


class Auth {
	private $db;
	private $mysql;

	function Auth() {
		$this->db = new Database();
		$this->mysql = $this->db->connect();
	}

	function login($username, $password) {
		$q = $this->db->query("SELECT * FROM users
			WHERE
				username='" . $this->db->ads($username) . "'
				AND password='" . md5($password) . "'");
		if($this->db->num_rows($q)==0)
			return false;
		$row = $this->db->fetch_array($q);
		return ['id' => $row['id'], 'username' => $row['username']];
	}

	function isUserExists($username) {
		$q = $this->db->query("SELECT id FROM users WHERE username='" . $this->db->ads($username) . "'");
		if($this->db->num_rows($q)==0)
			return false;
		$id = $this->db->fetch_array($q);
		return $id;
	}

	function register($username, $password) {
		if($this->isUserExists($username))
			return ['error' => true, 'message' => 'USER_EXISTS'];
		if(preg_match('@[^A-z\d]@', $username))
			return ['error' => true, 'message' => 'FORBIDDEN_CHARS'];
		$q = $this->db->query("INSERT INTO users (username, password) VALUES ('" . $this->db->ads($username) . "', '" . md5($password) . "')");
		if($insert_id = $this->db->insert_id())
			return ['error' => false, 'message' => 'User was created', 'id' => $insert_id];
		return ['error' => true, 'message' => 'UNKNOWN_ERROR'];
	}
} 

?>