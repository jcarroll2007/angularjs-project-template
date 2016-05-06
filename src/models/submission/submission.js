(function () {
    'use strict';

    function Submission($q) {
        var self = {};

        self._cache = {
            list: []
        };

        self.getList = function () {
            return $q.resolve(self._cache.list);
        };

        self.save = function (model) {
            /**
             * This function currently just creates a fake submission
             * and assigns it a fake ID based on the number of submissions
             * in the list.
             */
            var submission = angular.copy(model);
            submission.id = self._cache.list.length + 1;
            self._cache.list.push(submission);
            return $q.resolve(submission);
        };

        return self;
    }

    function loadFixtures($rootScope, Submission) {
        if ($rootScope.debug) {
            Submission.save({
                id: 1,
                name: 'Jordan Carroll',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven',
                image: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/12342504_10208675592032047_2237316667569290936_n.jpg?oh=66cfdbe0967533875b661dbf8281e94b&oe=574BE051'
            });
            Submission.save({
                id: 2,
                name: 'Zack Browne',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD because He caerve it. He made a way from Heaven, not to Heaven I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to HeavenI love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven',
                image: 'http://media.idownloadblog.com/wp-content/uploads/2012/04/Phil-Schiller-headshot-e1362692403868.jpg'
            });
            Submission.save({
                id: 50,
                name: 'John Doe',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven',
                image: 'http://pdnpulse.pdnonline.com/wp-content/uploads/2012/07/Andrew-Fingerman-Headshot.jpg'
            });
            Submission.save({
                id: 25,
                name: 'Alan Thicke',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD bm Heaven, not to Heaven',
                image: 'https://avatars1.githubusercontent.com/u/8485105?v=3&s=460'
            });
            Submission.save({
                id: 5,
                name: 'Jordan Carroll',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven',
                image: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/12342504_10208675592032047_2237316667569290936_n.jpg?oh=66cfdbe0967533875b661dbf8281e94b&oe=574BE051'
            });
            Submission.save({
                id: 6,
                name: 'Jordan Carroll',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'I love our LORD because He came to us to save us when we didn\'t deserve it. He made a way from Heaven, not to Heaven',
                image: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/12342504_10208675592032047_2237316667569290936_n.jpg?oh=66cfdbe0967533875b661dbf8281e94b&oe=574BE051'
            });
            Submission.save({
                id: 6,
                name: 'Jordan Carroll',
                email: 'jcarroll2007@gmail.com',
                age: '23',
                reason: 'My reason is short.',
                image: 'https://scontent-atl3-1.xx.fbcdn.net/hphotos-xta1/v/t1.0-9/12342504_10208675592032047_2237316667569290936_n.jpg?oh=66cfdbe0967533875b661dbf8281e94b&oe=574BE051'
            });
        }
    }

    angular.module('models.submission', [])
        .factory('Submission', Submission)
        .run(loadFixtures);
}());