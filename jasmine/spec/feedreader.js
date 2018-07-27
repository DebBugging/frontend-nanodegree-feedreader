/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* First test suite - the RSS feeds definitions */
    describe("RSS Feeds", function() {
      /* Test to make sure that the allFeeds
       variable has been defined and is not empty.
               */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* Test each allFeeds to ensure it has a 
      URL defined and is not empty.
               */
      it("defined URL", function() {
        for (let feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        }
      });

      /* Test each allFeeds to ensure it has
       a name defined is not empty.
               */
      it("defined name", function() {
        for (let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        }
      });
    });

    /* Second test suite - "The menu" */
    describe("The menu", function() {
      let body = $("body");

      /* Test that ensures the menu 
      element is hidden by default.
               */
      it("hidden by default", function() {
        expect(body.hasClass("menu-hidden")).toBe(true);
      });
      /* Test that ensures the menu changes 
      visibility when the menu icon is clicked.
                */
      it("show or hide when clicked", function() {
        let menuIcon = $(".menu-icon-link");

        menuIcon.click();
        expect(body.hasClass("menu-hidden")).toBe(false);

        menuIcon.click();

        expect(body.hasClass("menu-hidden")).toBe(true);
      });
    });

    /* Third test suite - "Initial Entries" */
    describe("Initial Entries", function() {
      /* Test that ensures there is at least a single
       .entry element within the .feed container.
       *Use beforeEach - Asynchronous
                       */
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it("display at least one entry", function() {
        expect($(".feed .entry").length >= 1).toBe(true);
      });
    });

    /* Fourth test suite - "New Feed Selection" */
    describe("New Feed Selection", function() {
      let feed = $(".feed");
      let oneFeed, twoFeed;

      /* Test that ensures when a new feed 
                  is loaded the content changes.
                  *Use beforeEach - Asynchronous
                       */
      beforeEach(function(done) {
        loadFeed(0, function() {
          oneFeed = feed.html();
          done();
        });
      });

      it("change content when loaded", function(done) {
        loadFeed(1, function() {
          twoFeed = feed.html();
          expect(twoFeed).not.toBe(oneFeed);
          done();
        });
      });
    });
  })()
);
