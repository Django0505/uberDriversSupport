-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 27, 2015 at 10:47 AM
-- Server version: 5.6.19-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `uberDriverSupport`
--

-- --------------------------------------------------------

--
-- Table structure for table `agent`
--

CREATE TABLE IF NOT EXISTS `agent` (
  `agent_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`agent_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`agent_id`, `username`, `password`) VALUES
(1, 'smith', 'null'),
(2, 'smithers', '$2a$10$MEckjgJj.5kt2WwTvf9aPuhiCkOpeR3m3XeQBeOG7LjIMrtB3FMCi');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE IF NOT EXISTS `appointment` (
  `query_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE IF NOT EXISTS `driver` (
  `user_id` int(100) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cell` int(11) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`,`email`,`cell`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`user_id`, `username`, `email`, `cell`, `password`) VALUES
(1, 'joe', 'joe@dirt.com', 123456789, '$2a$10$B6Ql1o5HsBFegTA4Cueb5OVIMVg.a509J9x8Fg19yzpJRU.3iZ2SK'),
(2, 'max', 'max@mad.com', 1234567890, '$2a$10$GqeMhrjq2/zQewTvU14n3OxtmJ6zzUiovpC/QNw49C/2gIrpkQjru');

-- --------------------------------------------------------

--
-- Table structure for table `query`
--

CREATE TABLE IF NOT EXISTS `query` (
  `query_id` int(11) NOT NULL AUTO_INCREMENT,
  `driver_id` int(11) NOT NULL,
  `query` text NOT NULL,
  PRIMARY KEY (`query_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `query`
--

INSERT INTO `query` (`query_id`, `driver_id`, `query`) VALUES
(1, 1, 'Customer forgot phone'),
(2, 2, 'New Driver Registration'),
(3, 1, 'Phone issues'),
(4, 2, 'Misconduct');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
