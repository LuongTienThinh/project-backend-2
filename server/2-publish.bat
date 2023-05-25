php artisan vendor:publish --force
php artisan vendor:publish --provider="Foostart\Company\CompanyServiceProvider" --force
php artisan vendor:publish --provider="Foostart\Courses\CoursesServiceProvider" --force
php artisan vendor:publish --provider="Foostart\Internship\InternshipServiceProvider" --force
php artisan vendor:publish --provider="Foostart\Category\CategoryServiceProvider" --force
php artisan vendor:publish --provider="Foostart\English\EnglishServiceProvider" --force
php artisan migrate
php artisan db:seed --class=CompanySeeder
php artisan db:seed --class=CourseSeeder
php artisan db:seed --class=CrawlerSeeder
php artisan db:seed --class=PexcelSeeder
php artisan db:seed --class=CompanySeeder
