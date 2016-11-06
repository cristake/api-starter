<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\Transformers\UserTransformer;
use App\Repositories\UserRepository as User;

class UserController extends Controller
{
    /**
     * The user
     *
     * @return void
     */
    private $user;

    /**
     * Create a new user instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        // $this->middleware('auth:api', ['except' => ['store']]);
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = $this->user->all();

        return $this->response
            ->collection($users, new UserTransformer, ['key' => 'users']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $this->user->create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password'))
        ]);

        return response($user, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = $this->user->find($id);

        if($user) {
            return $this->response
                ->item($user, new UserTransformer, ['key' => 'user']);
        }
        else {
            throw new \Dingo\Api\Exception\ResourceException("Unprocessable Entity");
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->user->delete($id);
    }
}
